"use client";

import React, { useState } from "react";
import TextField from "../../components/atoms/TextField";
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
import {
  CreateTodoFormData,
  createTodoSchema,
  EditTodoFormData,
  editTodoSchema,
} from "@/src/schemas/todoSchema";
import { useForm } from "react-hook-form";
import FormDashboardWrapper from "@/src/components/organisms/FormDashboardWrapper";
import { useToast } from "@/src/hooks/useToast";
import ConfirmModal from "@/src/components/molecules/ModalConfirm";
import FilterDashboard from "@/src/components/organisms/FilterDashboard";

export default function DashboardPage() {
  const { data: todolist, isLoading, refetch, isError, error } = useTodoList();
  const { mutateAsync: createTodo, isPending: isPendingCreate } = useCreateTodo();
  const { mutateAsync: editTodo, isPending: isPendingEdit } = useEditodo();
  const { mutateAsync: deleteTodo, isPending: isPendingDelete } = useDeleteTodo();
  const { filter, setFilter } = useFilter();
  const [isEdit, setIsEdit] = useState(false);
  const { toast } = useToast();
  const [openModal, setOpenModal] = useState(false);
  const [todoId, setTodoId] = useState<number | null>(null);

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
      if (result?.data) {
        toast.success("Buat tugas baru berhasil!");
        resetCreateTodo();
        refetch()
      }
    } catch (error) {
      toast.error("Buat tugas baru gagal. Silakan coba lagi.");
    }
  };

  const onSubmitEditTodo = async (data: EditTodoFormData) => {
    try {
      const result = await editTodo(data);
      if (result?.data) {
        toast.success("Edit tugas berhasil!");
        resetEditTodo();
        setIsEdit(false);
        refetch()
      }
    } catch (error) {
      toast.error("Edit tugas gagal. Silakan coba lagi.");
    }
  };

  const column: Column<Todo>[] = [
    {
      header: "Nama Tugas",
      accessor: (data) => (
        <span
          className={
            data.status === "done"
              ? "line-through text-slate-400 dark:text-slate-500"
              : "text-slate-900 dark:text-slate-100 font-medium"
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
            try {
              const result = await editTodo({
                id: data.id,
                name: data.name,
                status: e.target.value as TodoType,
              });
              if (result) {
                toast.success("Status tugas berhasil diperbarui!");
                refetch()
              }
            } catch (error) {
              toast.error("Gagal memperbarui status tugas.");
            }
          }}
          className={`${
            data.status === "done"
              ? "border-emerald-500/30 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
              : data.status === "inProgress"
                ? "border-amber-500/30 bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                : "border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
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
                setValueEditTodo("id", data.id);
                setValueEditTodo("name", data.name);
                setValueEditTodo("status", data.status);
                setIsEdit(true);
              }}
              className="!w-auto p-2"
              title="Edit Tugas"
            >
              <Edit size={14} />
            </Button>

            <Button
              onClick={() => {
                setOpenModal(true);
                setTodoId(data.id);
              }}
              disabled={isPendingDelete}
              color="danger"
              className="!w-auto p-2"
              title="Hapus Tugas"
            >
              <Trash size={14} />
            </Button>
          </div>
        );
      },
    },
  ];

  if(isError && error){
    return (
      <DashboardTemplate>
        <p>Terjadi kesalahan {error.message}</p>
      </DashboardTemplate>
    )
  }

  return (
    <DashboardTemplate>
      {/* STATS CARDS */}
      <StateCardWrapper>
        <StateCard
          title="Total Tugas"
          total={todolist?.data.total ?? 0}
          color="white"
          isLoading={isLoading}
        />
        <StateCard
          title="To Do"
          total={todolist?.data.total_todo ?? 0}
          color="gray"
          isLoading={isLoading}
        />
        <StateCard
          title="In Progress"
          total={todolist?.data.total_in_progress ?? 0}
          color="warning"
          isLoading={isLoading}
        />
        <StateCard
          title="Done"
          total={todolist?.data.total_done ?? 0}
          color="success"
          isLoading={isLoading}
        />
      </StateCardWrapper>

      {/* FORM TAMBAH TUGAS */}
      <FormDashboardWrapper title="Buat Tugas Baru">
        <form
          noValidate
          onSubmit={handleSubmitCreateTodo(onSubmitCreateTodo)}
          className="flex flex-col gap-3"
        >
          <TextField
            type="text"
            placeholder="Tuliskan tugas yang akan dikerjakan..."
            error={errorsCreateTodo.name?.message}
            {...registerCreateTodo("name")}
          />
          <div className="flex justify-end">
            <Button type="submit" className="w-40" disabled={isPendingCreate}>
              Tambah
            </Button>
          </div>
        </form>
      </FormDashboardWrapper>

      {/* FORM EDIT TUGAS */}
      {isEdit && (
        <FormDashboardWrapper title="Edit Tugas">
          <form
            noValidate
            onSubmit={handleSubmitEditTodo(onSubmitEditTodo)}
            className="flex flex-col gap-3"
          >
            <TextField
              type="text"
              placeholder="Ubah tugas yang kamu miliki..."
              error={errorsEditTodo.name?.message}
              {...registerEditTodo("name")}
            />
            <div className="flex justify-end gap-2">
              <Button type="submit" className="w-40" disabled={isPendingEdit}>
                Ubah
              </Button>
              <Button
                type="button"
                className="w-40"
                disabled={isPendingEdit}
                onClick={() => {
                  setIsEdit(false);
                  resetEditTodo();
                }}
                color="danger"
              >
                Batal
              </Button>
            </div>
          </form>
        </FormDashboardWrapper>
      )}

      {/* SEARCH & FILTER BAR */}
      <FilterDashboard/>

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
        orderBy={filter.order_by ?? "id"}
        order={filter.order ?? "asc"}
        onChangeSort={(order_by, order) =>
          setFilter({ order_by, order, offset: 0 })
        }
        isLoading={isLoading}
      />

      {/* MODAL KONFIRMASI HAPUS */}
      <ConfirmModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={async () => {
          try {
            if (todoId) {
              const result = await deleteTodo(todoId);
              if (result) {
                toast.success("Hapus tugas berhasil!");
                setOpenModal(false);
                setTodoId(null);
                refetch()
              }
            } else {
              toast.error("Hapus tugas gagal. Silakan coba lagi.");
            }
          } catch (error) {
            toast.error("Hapus tugas gagal. Silakan coba lagi.");
          }
        }}
        title="Hapus Tugas Ini?"
        description="Tugas yang dihapus tidak dapat dikembalikan lagi. Apakah Anda yakin ingin melanjutkan?"
        confirmLabel="Hapus Permanen"
        cancelLabel="Batal"
        variant="danger"
        isLoading={isPendingDelete}
      />
    </DashboardTemplate>
  );
}