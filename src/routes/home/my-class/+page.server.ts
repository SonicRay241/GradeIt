import type { Assignments, avgResult, Courses, Grades } from "@prisma/client";
import { fail, redirect, error } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import type { GradeData } from "$lib/types";

export const load = (async ({ locals }) => {
    const { user, session } = await locals.validateUser()
    if ( !session ) {
        throw redirect(302, "/login")
    }

    if (!user.class){
        throw redirect(302, "/home/dashboard")
    }

    const courses = await prisma.courses.findMany({
        where: {
            class: user.class!
        }
    })

    function onlyUnique(value: string, index: number, array: Array<string>) {
        return array.indexOf(value) === index;
    }

    let resAvg: avgResult[] = []
    let allNis: string[] = []
    let allNames: string[] = []

    for (let course of courses) {
        resAvg = [...resAvg, ...(
            await prisma.avgResult.findMany({
                where: {
                    courseId: course.id,
                    taskRemed: true,
                    testRemed: true
                }
            })
        ), ...(
            await prisma.avgResult.findMany({
                where: {
                    courseId: course.id,
                    taskRemed: true,
                    testRemed: false
                }
            })
        ), ...(
            await prisma.avgResult.findMany({
                where: {
                    courseId: course.id,
                    taskRemed: false,
                    testRemed: true
                }
            })
        ),
        ]
    }

    for (let result of resAvg) {
        allNames.push(result.studentName)
        allNis.push(result.studentNis)
    }

    const uniqueNis = allNis.filter(onlyUnique)
    const uniqueNames = allNames.filter(onlyUnique)

    let studentData: string[][] = []

    for (let i = 0; i < uniqueNis.length; i++) {
        studentData = [...studentData,
            [uniqueNames[i], uniqueNis[i]]
        ]
    }

    let gradeData: avgResult[][] = []

    for (let i = 0; i < studentData.length; i++) {
        gradeData = [...gradeData, []]
        for (let res of resAvg) {
            if (res.studentNis == studentData[i][1]){
                gradeData[i].push(res)
            }
        }
    }


    console.log(studentData);
    console.log(gradeData);
    
    
    return {
        user,
        studentData,
        gradeData
    }

}) satisfies PageServerLoad