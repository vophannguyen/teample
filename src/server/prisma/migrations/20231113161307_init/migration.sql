-- CreateTable
CREATE TABLE "student" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "gpa" DOUBLE PRECISION NOT NULL DEFAULT 0.00,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "student_id_key" ON "student"("id");

-- CreateIndex
CREATE UNIQUE INDEX "student_email_key" ON "student"("email");
