<script lang='ts'>
    import Table from "$lib/components/Table.svelte";
    import TableBody from "$lib/components/TableBody.svelte";
    import TableBodyChildGrade from "$lib/components/TableBodyChildGrade.svelte";
    import TableHead from "$lib/components/TableHead.svelte";
    import TableHeadChild from "$lib/components/TableHeadChild.svelte";
    import { fly } from "svelte/transition";
    import { cubicInOut } from "svelte/easing";
    import type { GradeData } from "$lib/types";

    const studentData: string[][] = [
        ["Amogus","123456789"],
        ["Amogus2","987654321"]
    ]
    const dataaa: GradeData[][] = [[
        {
            course: "A",
            coursework: true,
            exam: false,
            teacherName: "Amogus Teacher"
        },
        {
            course: "B",
            coursework: true,
            exam: false,
            teacherName: "Amogus Teacher 2"
        },
        {
            course: "C",
            coursework: true,
            exam: true,
            teacherName: "Amogus Teacher 3"
        }
    ],
    [
        {
            course: "A",
            coursework: true,
            exam: false,
            teacherName: "Amogus Teacher"
        },
        {
            course: "E",
            coursework: false,
            exam: true,
            teacherName: "Amogus Teacher 69"
        },
    ]
    ]
</script>

<div class="ml-20 mt-3 p-5 md:p-10 xl:p-20" in:fly="{{x:100, easing:cubicInOut, delay: 200}}" out:fly="{{x:100, easing:cubicInOut, duration:200}}">
    <h1 class="text-4xl font-semibold mb-10">Class Grades</h1>
    <Table>
        <TableHead>
            <TableHeadChild label="No"/>
            <TableHeadChild label="Nama"/>
            <TableHeadChild label="NIS"/>
            <TableHeadChild label="Mata Pelajaran"/>
            <TableHeadChild label="Harian"/>
            <TableHeadChild label="PAS"/>
            <TableHeadChild label="Nama Guru"/>
        </TableHead>
        <TableBody>
            {#each dataaa as a, i}
            <TableBodyChildGrade index="{i}" name="{studentData[i][0]}" nis="{studentData[i][1]}" data="{a}"/>
            {/each}
        </TableBody>
    </Table>
</div>
