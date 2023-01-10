-- CreateTable
CREATE TABLE "Joke" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UsersJokes" (
    "jokeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    PRIMARY KEY ("jokeId", "userId"),
    CONSTRAINT "UsersJokes_jokeId_fkey" FOREIGN KEY ("jokeId") REFERENCES "Joke" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsersJokes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Joke_url_key" ON "Joke"("url");
