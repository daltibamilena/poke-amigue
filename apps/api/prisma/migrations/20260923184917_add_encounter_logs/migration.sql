-- CreateTable
CREATE TABLE "EncounterLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "environment" TEXT NOT NULL,
    "rarity" INTEGER NOT NULL,
    "pokemon" TEXT,
    "number" INTEGER,
    "level" TEXT,
    "levelRoll" INTEGER,
    "gender" TEXT,
    "nature" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EncounterLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
