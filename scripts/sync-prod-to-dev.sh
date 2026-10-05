#!/bin/bash
# ==============================================================================
# Script: sync-prod-to-dev.sh
# Purpose: Copy Production Database & Uploaded Files to Development Environment
# ==============================================================================

# Database Configurations
PROD_DB_NAME="${PROD_DB_NAME:-casdu_cdm}"
DEV_DB_NAME="${DEV_DB_NAME:-casdu_cdm_dev}"
DB_USER="${DB_USER:-cdmoper}"
DB_PASS="${DB_PASS:-IT@udit2026#}"

# Upload Paths
PROD_UPLOAD_PATH="${PROD_UPLOAD_PATH:-/home/cdmoper/farside_source/uploads/}"
DEV_UPLOAD_PATH="${DEV_UPLOAD_PATH:-/home/cdmoper/farside_source_dev/uploads/}"

echo "================================================================="
echo "🔄 Starting Sync from Production ($PROD_DB_NAME) to Development ($DEV_DB_NAME)..."
echo "================================================================="

# 1. Sync Database
if command -v mysqldump &> /dev/null; then
    echo "📦 Dumping Production DB and restoring to Dev DB..."
    if [ -n "$DB_PASS" ]; then
        mysqldump -u "$DB_USER" -p"$DB_PASS" "$PROD_DB_NAME" | mysql -u "$DB_USER" -p"$DB_PASS" "$DEV_DB_NAME"
    else
        mysqldump -u "$DB_USER" "$PROD_DB_NAME" | mysql -u "$DB_USER" "$DEV_DB_NAME"
    fi
    if [ $? -eq 0 ]; then
        echo "✅ Database sync completed successfully!"
    else
        echo "❌ Database sync failed. Please check MySQL permissions for $DEV_DB_NAME."
    fi
else
    echo "⚠️ mysqldump command not found. Skipping DB sync step."
fi


# 2. Sync Files
if [ -d "$PROD_UPLOAD_PATH" ]; then
    echo "📁 Syncing uploaded files from $PROD_UPLOAD_PATH to $DEV_UPLOAD_PATH..."
    mkdir -p "$DEV_UPLOAD_PATH"
    rsync -av --delete "$PROD_UPLOAD_PATH" "$DEV_UPLOAD_PATH"
    if [ $? -eq 0 ]; then
        echo "✅ File sync completed successfully!"
    else
        echo "❌ File sync failed."
    fi
else
    echo "⚠️ Production upload path $PROD_UPLOAD_PATH not found. Skipping file sync step."
fi

echo "================================================================="
echo "🎉 Sync process finished!"
echo "================================================================="
