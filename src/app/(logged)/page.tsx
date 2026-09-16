"use client";

import React, { useState } from "react";
import TextField from "../../components/atoms/InputField";
import Button from "../../components/atoms/Button";
import { Edit, Plus, Trash } from "lucide-react";
import Dropdown from "../../components/atoms/Dropdown";
import options from "../../lib/options";
import {
  useCreateTodo,
  useDeleteTodo,
  useEditodo,
  useTodoList,
} from "../../queries/todo";
import Table, { Column } from "../../components/molecules/Table";
import { Todo, TodoType } from "../../types/todo";
import useFilter from "../../stores/useFilter";
import StateCard from "../../components/atoms/StateCard";
import DashboardTemplate from "../../components/templates/DashboardTemplate";
import StateCardWrapper from "../../components/molecules/StateCardWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTodoFormData, createTodoSchema, EditTodoFormData, editTodoSchema } from "@/src/schemas/todoSchema";
import { useForm } from "react-hook-form";

export default function DashboardPage() {
  const { data: todolist } = useTodoList();
  const { mutateAsync: createTodo, isPending } = useCreateTodo();
  const { mutateAsync: editTodo } = useEditodo();
  const { mutateAsync: deleteTodo } = useDeleteTodo();
  const { filter, setFilter } = useFilter();
  const [isEdit, setIsEdit] = useState(false)

  const {
    register: registerCreateTodo,
    handleSubmit: handleSubmitCreateTodo,
    formState: { errors: errorsCreateTodo },
    reset: resetCreateTodo,
  } = useForm<CreateTodoFormData>({
    resolver: zodResolver(createTodoSchema),
  });

  const {
    register: registerEditTodo,
    handleSubmit: handleSubmitEditTodo,
    formState: { errors: errorsEditTodo },
    setValue: setValueEditTodo,
    reset: resetEditTodo,
  } = useForm<EditTodoFormData>({
    resolver: zodResolver(editTodoSchema),
  });

  const onSubmitCreateTodo = async (data: CreateTodoFormData) => {
    try {
      const result = await createTodo(data);
      console.log("result", result);
      if (result.data) {
        alert("Pendaftaran berhasil!");
        resetCreateTodo();
      }
    } catch (error) {
      console.error("Register gagal:", error);
      alert("Pendaftaran gagal. Silakan coba lagi.");
    }
  };

  const onSubmitEditTodo = async (data: EditTodoFormData) => {
    try {
      const result = await editTodo(data);
      console.log("result", result);
      if (result.data) {
        alert("Pendaftaran berhasil!");
        resetEditTodo();
      }
    } catch (error) {
      console.error("Register gagal:", error);
      alert("Pendaftaran gagal. Silakan coba lagi.");
    }
  };

  const column: Column<Todo>[] = [
    {
      header: "Nama Tugas",
      accessor: (data) => (
        <span
          className={
            data.status === "done" ? "line-through text-slate-500" : ""
          }
        >
          {data.name}
        </span>
      ),
      sortKey: "name",
    },
    {
      header: "Status",
      accessor: (data) => (
        <Dropdown
          options={options.todoStatusTable}
          value={data.status}
          onChange={async (e) => {
            const result = await editTodo({
                id: data.id,
                name: data.name,
                status: e.target.value as TodoType,
              });
            if (result) {
              alert("Pendaftaran berhasil!");
            }
          }}
          className={`${
            data.status === "done"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
              : data.status === "inProgress"
                ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                : "border-slate-700 bg-slate-950 text-slate-300"
          }`}
        />
      ),
      sortKey: "status",
    },
    {
      header: "Aksi",
      accessor: (data) => {
        return (
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setValueEditTodo("id", data.id)
                setValueEditTodo("name", data.name)
                setIsEdit(true)
              }}
            >
              <Edit size={14} />
            </Button>

            <Button
              onClick={async () => {
                const result = await deleteTodo(data.id);
                if (result) {
                  alert("Pendaftaran berhasil!");
                }
              }}
            >
              <Trash size={14} />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <DashboardTemplate>
      {/* STATS CARDS */}
      <StateCardWrapper>
        <StateCard
          title="Total Tugas"
          total={todolist?.data.total ?? 0}
          variant="white"
        />
        <StateCard
          title="To Do"
          total={todolist?.data.total_todo ?? 0}
          variant="gray"
        />
        <StateCard
          title="In Progress"
          total={todolist?.data.total_in_progress ?? 0}
          variant="warning"
        />
        <StateCard
          title="Done"
          total={todolist?.data.total_done ?? 0}
          variant="success"
        />
      </StateCardWrapper>

      {/* FORM TAMBAH TUGAS */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">
          Tambah Tugas Baru
        </h2>
        <form onSubmit={handleSubmitCreateTodo(onSubmitCreateTodo)} className="flex flex-col gap-3">
          <TextField
            type="text"
            placeholder="Tuliskan tugas yang akan dikerjakan..."
            error={errorsCreateTodo.name?.message}
            {...registerCreateTodo("name")}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              startIcon={<Plus size={14} />}
              className="w-40"
              disabled={isPending}
            >
              Tambah
            </Button>
          </div>
        </form>
      </div>

      {isEdit && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">
            Edit Tugas
          </h2>
          <form onSubmit={handleSubmitEditTodo(onSubmitEditTodo)} className="flex flex-col gap-3">
            <TextField
              type="text"
              placeholder="Tuliskan tugas yang akan dikerjakan..."
              error={errorsEditTodo.name?.message}
              {...registerEditTodo("name")}
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                startIcon={<Plus size={14} />}
                className="w-40"
                disabled={isPending}
                onClick={() => {
                  setIsEdit(false)
                  resetEditTodo()
                }}
              >
                Batal
              </Button>
              <Button
                type="submit"
                startIcon={<Plus size={14} />}
                className="w-40"
                disabled={isPending}
              >
                Tambah
              </Button>
            </div>
          </form>
        </div>
        )}

      {/* SEARCH & FILTER BAR */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <TextField
            value={filter.search}
            onChange={(e) => {
              setFilter({ search: e.target.value, offset: 0 });
            }}
            placeholder="Cari tugas..."
          />
        </div>

        <div className="flex gap-2">
          <Dropdown
            value={filter.limit}
            onChange={(e) => {
              setFilter({ limit: Number(e.target.value), offset: 0 });
            }}
            options={options.perPage}
          />
          <Dropdown
            value={filter.status}
            onChange={(e) => {
              setFilter({ status: e.target.value as TodoType, offset: 0 });
            }}
            options={options.todoStatusFilter}
          />
        </div>
      </div>

      {/* TODOLIST TABLE SECTION */}
      <Table
        data={{
          data: todolist?.data.data ?? [],
          total: todolist?.data.total ?? 0,
        }}
        columns={column}
        limit={filter.limit}
        offset={filter.offset}
        onChangeOffset={(offset) => setFilter({ offset: offset })}
        sortTable
        orderBy={filter.order_by ?? "name"}
        order={filter.order ?? "asc"}
        onChangeSort={(order_by, order) =>
          setFilter({ order_by, order, offset: 0 })
        }
      />
    </DashboardTemplate>
  );
}
