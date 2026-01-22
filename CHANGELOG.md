# PolyDropBox — Changelog & Updates

This document lists all updates, new features, and improvements made to the PolyDropBox platform.

---

## Newly Added Features

### File Preview (Before Payment)
- **PDF Preview**: Preview the first page of PDF files before purchase
- **Blurred Image Preview**: Blurred thumbnail preview for images (JPG, PNG, GIF, WebP) before purchase
- Automatic preview generation at upload time for supported file types
- Previews stored on IPFS for fast loading

### Folder & Multi-File Upload
- **Upload multiple files** in a single action (up to 10 files)
- Same access rules (price, expiry, downloads) applied to all files in batch
- Add or remove files before submitting
- Separate share links generated for each file
- Max file size: 50MB per file

### Password-Protected Share Links
- Optional password protection for share links
- Recipients must enter the correct password to view the file page
- Combined with on-chain access control for layered security
- SHA-256 hashed password storage (no plain-text passwords)

### Link Expiry
- **Expiring shareable links**: Optional expiry for the share link itself
- Configurable: 24 hours, 7 days, or 30 days
- When expired, the link displays an "Link Expired" message and blocks access
- Separate from file access expiry (file expiry controls when paid users can download)

### Security Improvements
- **Expiring shareable links**: Control when share links stop working
- **Detailed download audit logs**: Full transparency for every download
  - User wallet address
  - Timestamp
  - Blockchain transaction hash (when available)
- Audit logs visible in Creator Dashboard for each file
- Link to PolygonScan for each download transaction

---

## UI/UX Enhancements

### Design Polish
- **Plus Jakarta Sans** font for a modern, clean aesthetic
- **Rounded corners** (rounded-xl, rounded-2xl) across components
- Gradient backgrounds (slate-50 → white → primary-50)
- Subtle shadows and hover effects for better interactivity
- Responsive layout improvements

### Footer
- Site-wide footer with product links
- Contract link to PolygonScan
- "Powered by" section (Polygon, IPFS, SideShift)

### Dashboard
- Expandable rows to view download audit logs per file
- Transaction hash links to PolygonScan
- Clearer stats cards and file table
- Improved empty state

### Upload Page
- Multi-file dropzone with file list
- Remove individual files before upload
- Password and link expiry options
- Cleaner form layout with grid

### File Page
- Password gate with unlock flow
- Preview section for PDFs and images
- Link expired state
- Refined payment flow UI

---

## Technical Changes

### Backend
- **Shared DB module** (`lib/db.ts`): Centralized File schema and MongoDB connection
- **Preview API** (`/api/preview/[fileId]`): Serves preview media from IPFS
- **Password verification** via POST to `/api/file/[fileId]`
- **Multi-file upload** support in `/api/upload`
- **Download audit logs**: `txHash` and timestamp stored per download
- **Preview generation**: `sharp` for image blur, `pdf-lib` for PDF first page extraction

### Schema Updates
- `previewHash`: IPFS hash of preview (blurred image or PDF first page)
- `sharePasswordHash`: SHA-256 hash of optional share password
- `linkExpiresAt`: Unix timestamp when share link expires
- `mimeType`: File MIME type for preview rendering
- `downloads[].txHash`: Blockchain transaction hash for each download

---

## Production Readiness Status

- ✅ Smart contracts updated and ready for on-chain deployment
- ✅ All features fully integrated and working end-to-end
- ✅ Complete API testing performed across upload, payment, and download flows
- ✅ Blockchain, IPFS, and SideShift integrations verified
- ✅ Application is stable, secure, and production-ready

---

## Dependencies Added

- `sharp` — Image processing for blurred previews
- `pdf-lib` — PDF manipulation for first-page preview

---

**Built with ❤️ using Polygon, SideShift, IPFS, and Next.js**
