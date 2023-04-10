<script>
    import Table from "$lib/components/Table.svelte";
    import TableHead from "$lib/components/TableHead.svelte";
    import TableHeadChild from "$lib/components/TableHeadChild.svelte";
    import TableBody from "$lib/components/TableBody.svelte";
    import TableBodyChild from "$lib/components/TableBodyChild.svelte";
</script>

<div class="ml-20 mt-3 p-5 md:p-10 xl:p-20">
    <h1 class="text-4xl font-semibold mb-16">Classes</h1>
        <Table Class="mx-56">
            <TableHead>
                <TableHeadChild label="Kelas"/>
                <TableHeadChild label="Wali Kelas"/>
                <TableHeadChild label=""/>
            </TableHead>
            <TableBody>
                <TableBodyChild name="A" data="A" editable>
                    <div class="flex items-center justify-end">
                        <button class="bg-indigo-500 hover:bg-indigo-600 w-10 h-10 mx-2 text-white rounded">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button class="bg-red-500 hover:bg-red-600 w-10 h-10 mx-2 text-white rounded">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </TableBodyChild>
            </TableBody>
        </Table>
</div>
