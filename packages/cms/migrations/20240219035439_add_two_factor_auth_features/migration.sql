-- AlterTable
ALTER TABLE "User" ADD COLUMN     "twoFactorAuthBypass" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "twoFactorAuthSecret" TEXT,
ADD COLUMN     "twoFactorAuthTemp" TEXT,
ADD COLUMN     "twoFactorAuthVerified" TIMESTAMP(3);

-- Update twoFactorAuthBypass to true for all users who's role is end with _headless_account
UPDATE public."User"
SET "twoFactorAuthBypass" = true
WHERE role LIKE '%_headless_account';
