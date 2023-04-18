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
        const { name } = Object.fromEntries(await request.formData()) as {
            name: string
        } as Record<string, string>

        try {
            await prisma.assignments.create({
                data: {
                    name,
                    urlID: params.slug
                }
            })
        } catch (err) {
            console.log(err);
            return fail(500, {message: "Failed to create a new assignment"})
        }
    },
    createStudent:async ({ params, request }) => {
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
        } catch (err) {
            console.log(err);
            return fail(500, {message: "Failed to create a new student"})
        }
    },
    createOrUpdateGrade:async ({ params, request }) => {
        const { grade, studentId, assignmentId} = Object.fromEntries(
            await request.formData()
        ) as Record<string, string>

        const gradeData = await prisma.grades.findFirst({
            where: {
                assignmentID: +assignmentId,
                studentID: +studentId
            }
        })

        if (!gradeData) {
            try {
                await prisma.grades.create({
                    data:{
                        urlID: params.slug,
                        assignmentID: +assignmentId,
                        studentID: +studentId,
                        score: +grade
                    }
                })
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
            } catch (err) {
                console.log(err);
                return fail(500, { message: "Failed to update grade"})
            }
        }
    }
} satisfies Actions
    