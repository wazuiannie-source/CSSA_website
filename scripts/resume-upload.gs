/**
 * Receives resume files from the CSSA website and saves them to Drive.
 *
 * Service accounts have no storage quota, so they cannot create files in a
 * personal Drive folder. This script runs as the Drive account owner instead,
 * so uploads consume the owner's quota and land in the folder below.
 *
 * Deploy: Extensions/Apps Script > Deploy > New deployment > Web app
 *   Execute as:     Me
 *   Who has access: Anyone
 * The deployment URL and SHARED_SECRET go in the site's environment as
 * APPS_SCRIPT_UPLOAD_URL and APPS_SCRIPT_SECRET.
 *
 * Re-deploy (Manage deployments > edit > Version: New version) after any edit,
 * otherwise the old code keeps serving.
 */

// Drive folder that receives the resumes.
const FOLDER_ID = '1uFER2Y0DWLgmGQf-_UxwwqB68NTt2N8G'

// Must match APPS_SCRIPT_SECRET on the site. The deployment URL is public, so
// this is what stops anyone who finds it from writing files into the folder.
const SHARED_SECRET = 'REPLACE_WITH_YOUR_SECRET'

// Bumped on every edit so a plain GET reveals which version is actually live.
// Apps Script serves the deployed snapshot, not the saved editor code.
const SCRIPT_VERSION = 'v2'

function doGet() {
  return jsonOut({
    ok: true,
    version: SCRIPT_VERSION,
    secretConfigured: !!SHARED_SECRET && SHARED_SECRET.length >= 16,
  })
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents)

    // Length check rather than comparing to the placeholder text: replacing the
    // placeholder everywhere would otherwise rewrite this line too.
    if (!SHARED_SECRET || SHARED_SECRET.length < 16) {
      return jsonOut({ ok: false, error: 'Script secret not configured' })
    }
    if (body.secret !== SHARED_SECRET) {
      return jsonOut({ ok: false, error: 'Unauthorized' })
    }
    if (!body.data || !body.filename) {
      return jsonOut({ ok: false, error: 'Missing file data' })
    }

    const blob = Utilities.newBlob(
      Utilities.base64Decode(body.data),
      body.mimeType || 'application/octet-stream',
      body.filename
    )

    const file = DriveApp.getFolderById(FOLDER_ID).createFile(blob)

    // Link sharing can be blocked by Workspace policy; the upload itself still
    // succeeded, so keep the file rather than failing the whole submission.
    try {
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)
    } catch (err) {
      // Reviewers signed into the owning account can still open it.
    }

    return jsonOut({ ok: true, url: file.getUrl() })
  } catch (err) {
    return jsonOut({ ok: false, error: String(err) })
  }
}

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON)
}
