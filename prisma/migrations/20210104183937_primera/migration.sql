-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rolId" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update" DATETIME NOT NULL,

    FOREIGN KEY ("rolId") REFERENCES "Rol"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rol" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update" DATETIME NOT NULL,
    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Persimos" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update" DATETIME NOT NULL,
    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PersimosToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    FOREIGN KEY ("A") REFERENCES "Persimos"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_PersimosToUser_AB_unique" ON "_PersimosToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PersimosToUser_B_index" ON "_PersimosToUser"("B");
