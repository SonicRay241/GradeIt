<script lang="ts">
    import Table from "$lib/components/Table.svelte";
    import TableHead from "$lib/components/TableHead.svelte";
    import TableHeadChild from "$lib/components/TableHeadChild.svelte";
    import TableBody from "$lib/components/TableBody.svelte";
    import TableBodyChild from "$lib/components/TableBodyChild.svelte";
    import type { PageData } from './$types';
  
    export let data: PageData;
</script>



<div class="ml-16 mt-3 p-5 md:p-10 xl:p-20">
    <h1 class="text-4xl font-semibold mb-10 2xl:mx-56">Grades</h1>
    <Table Class="2xl:mx-56">
        <TableHead>
            <TableHeadChild label="Name"/>
            <TableHeadChild label="NIS"/>

            <TableHeadChild label="rata-rata"/>
            <TableHeadChild label="" buttons/>
        </TableHead>
        <TableBody>
            <TableBodyChild name="Tes" data="a,-"/>
        </TableBody>
    </Table>
</div>
