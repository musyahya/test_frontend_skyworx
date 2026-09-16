const options = {
    todoStatusFilter: [
        {
            label: "Semua Status",
            value: "all",
        },
        {
            label: "To Do",
            value: "todo",
        },
        {
            label: "In Progress",
            value: "inprogress",
        },
        {
            label: "Done",
            value: "done",
        },
    ],

    todoStatusTable: [
        {
            label: "To Do",
            value: "todo",
            className: "bg-slate-900 text-slate-300"
        },
        {
            label: "In Progress",
            value: "inprogress",
            className: "bg-slate-900 text-amber-400"
        },
        {
            label: "Done",
            value: "done",
            className: "bg-slate-900 text-emerald-400"
        },
    ],

    perPage: [
        {
            label: "5",
            value: 5,
        },
        {
            label: "10",
            value: 10,
        },
        {
            label: "20",
            value: 20,
        },
        {
            label: "50",
            value: 50,
        },
        {
            label: "100",
            value: 100,
        },
    ],
}

export default options