import type { AssignmentType } from '@prisma/client';
import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ params, locals }) => {
    const { user, session } = await locals.validateUser()
    if ( !session ) {
        throw redirect(302, "/login")
    }
    const courses = await prisma.courses.findUnique({
        where: {
            urlID: params.slug
        }
    })
    if (!courses) {
        throw error(404, "Course not found")
    }

    if (courses.teacherId != user.userId) {
        throw error(403, "Access not allowed")
    }

    const assignments = await prisma.assignments.findMany({
        where: {
            urlID: params.slug
        }
    })

    const grades = await prisma.grades.findMany({
        where: {
            urlID: params.slug
        }
    })

    const students = await prisma.students.findMany({
        where: {
            urlID: params.slug
        }
    })

    return {
        courses,
        assignments,
        grades,
        students
    }

}) satisfies PageServerLoad

export const actions = {
    createAssignment:async ({ params, request }) => {
        const { name, type } = Object.fromEntries(await request.formData()) as {
            name: string
        } as Record<string, string>

        try {
            await prisma.assignments.create({
                data: {
                    name,
                    urlID: params.slug,
                    type: type as AssignmentType
                }
            })
        } catch (err) {
            console.log(err);
            return fail(500, {message: "Failed to create a new assignment"})
        }
    },
    createStudent:async ({ params, request }) => {
        const course = await prisma.courses.findUnique({
            where: {
                urlID: params.slug
            }
        })
        const { name, nis } = Object.fromEntries(await request.formData()) as {
            name: string,
            nis: string
        } as Record<string, string>

        try {
            await prisma.students.create({
                data: {
                    name,
                    studentNis: nis,
                    urlID: params.slug,
                }
            })

            const student = await prisma.students.findFirst({
                where: {
                    studentNis: nis,
                    urlID: params.slug
                }
            })
            await prisma.avgResult.create({
                data: {
                    courseId: course?.id!,
                    coursename: course?.subject!,
                    teacherName: course?.teacherName!,
                    studentId: student?.id!,
                    studentName: student?.name!,
                    studentNis: student?.studentNis!,
                    taskRemed: true,
                    testRemed: true,
                }
            })
        } catch (err) {
            console.log(err);
            return fail(500, {message: "Failed to create a new student"})
        }
    },
    createOrUpdateGrade:async ({ params, request }) => {
        const { grade, studentId, assignmentId, assignmentType} = Object.fromEntries(
            await request.formData()
        ) as Record<string, string>

        console.log(studentId);
        

        const gradeData = await prisma.grades.findFirst({
            where: {
                assignmentID: +assignmentId,
                studentID: +studentId
            }
        })

        const course = await prisma.courses.findFirst({
            where:{
                urlID: params.slug
            }
        })

        if (!gradeData) {
            try {
                await prisma.grades.create({
                    data:{
                        urlID: params.slug,
                        assignmentID: +assignmentId,
                        studentID: +studentId,
                        score: +grade,
                        type: assignmentType as AssignmentType
                    }
                })

                const grades = await prisma.grades.findMany({
                    where: {
                        urlID: params.slug,
                        studentID: +studentId
                    }
                })

                let totalTaskGrade = 0
                let taskLength = 0
                let totalTestGrade = 0
                let testLength = 0

                for (let grade of grades) {
                    if (grade.type == "TUGAS") {
                        totalTaskGrade += grade.score
                        taskLength += 1
                    } else {
                        totalTestGrade += grade.score
                        testLength += 1
                    }
                }

                let taskGradeAvg = Math.floor(totalTaskGrade / taskLength)
                let testGradeAvg = Math.floor(totalTestGrade / testLength)

                if (assignmentType == "TUGAS") {
                    const taskRemed = (): boolean => {
                        if (taskGradeAvg < +(course?.kkm!)) {
                            return true                            
                        }
                        return false
                    }

                    const avgResult = await prisma.avgResult.findFirst({
                        where:{
                            courseId: course?.id,
                            studentId: +studentId
                        }
                    })

                    await prisma.avgResult.update({
                        where: {
                            id: avgResult?.id
                        },
                        data: {
                            taskRemed: taskRemed()
                        }

                    })
    
                } else {
                    const testRemed = (): boolean => {
                        if (testGradeAvg < +(course?.kkm!)) {
                            return true
                        }
                        return false
                    }
    
                    const avgResult = await prisma.avgResult.findFirst({
                        where:{
                            courseId: course?.id,
                            studentId: +studentId
                        }
                    })
    
                    await prisma.avgResult.update({
                        where:{
                            id: avgResult?.id
                        },
                        data: {
                            testRemed: testRemed()
                        }
                    })
                }

            } catch (err) {
                console.log(err);
                return fail(500, { message: "Failed to create grade"})
            }
        } else {
            try {
                await prisma.grades.update({
                    where: {
                        id: gradeData.id
                    },
                    data: {
                        score: +grade
                    }
                })

                const grades = await prisma.grades.findMany({
                    where: {
                        urlID: params.slug,
                        studentID: +studentId
                    }
                })

                let totalTaskGrade = 0
                let taskLength = 0
                let totalTestGrade = 0
                let testLength = 0

                for (let grade of grades) {
                    if (grade.type == "TUGAS") {
                        totalTaskGrade += grade.score
                        taskLength += 1
                    } else {
                        totalTestGrade += grade.score
                        testLength += 1
                    }
                }

                let taskGradeAvg = Math.floor(totalTaskGrade / taskLength)
                let testGradeAvg = Math.floor(totalTestGrade / testLength)

                if (assignmentType == "TUGAS") {
                    const taskRemed = (): boolean => {
                        if (taskGradeAvg < +(course?.kkm!)) {
                            return true                            
                        }
                        return false
                    }
    
                    const avgResult = await prisma.avgResult.findFirst({
                        where:{
                            courseId: course?.id,
                            studentId: +studentId
                        }
                    })

                    await prisma.avgResult.update({
                        where: {
                            id: avgResult?.id
                        },
                        data: {
                            taskRemed: taskRemed()
                        }

                    })
    
                } else {
                    const testRemed = (): boolean => {
                        if (testGradeAvg < +(course?.kkm!)) {
                            return true
                        }
                        return false
                    }
    
                    const avgResult = await prisma.avgResult.findFirst({
                        where:{
                            courseId: course?.id,
                            studentId: +studentId
                        }
                    })
    
                    await prisma.avgResult.update({
                        where:{
                            id: avgResult?.id
                        },
                        data: {
                            testRemed: testRemed()
                        }
                    })
                }
            } catch (err) {
                console.log(err);
                return fail(500, { message: "Failed to update grade"})
            }
        }
    },

    updateStudent: async ({ request }) => {
        const { value, studentId, updateType } = Object.fromEntries(
            await request.formData()
        ) as Record<string, string>

        try {
            if (updateType == "Name") {
                await prisma.students.update({
                    where: {
                        id: +studentId
                    },
                    data: {
                        name: value
                    }
                })

                await prisma.avgResult.update({
                    where: {
                        studentId: +studentId
                    },
                    data: {
                        studentName: value
                    }
                })
            } else {
                await prisma.students.update({
                    where: {
                        id: +studentId
                    },
                    data: {
                        studentNis: value
                    }
                })

                await prisma.avgResult.update({
                    where: {
                        studentId: +studentId
                    },
                    data: {
                        studentNis: value
                    }
                })
            }
        } catch (err) {
            console.log(err);
            return fail(500, { message: "Failed to update student"})
        }
    },

    deleteStudent: async ({ request }) => {
        const { uid } = Object.fromEntries(
            await request.formData()
        )

        try {
            await prisma.students.delete({
                where: {
                    id: +uid
                }
            })
        } catch (err) {
            console.log(err);
            return fail(500, { message: "Failed to update student"})
        }
    }
} satisfies Actions
    