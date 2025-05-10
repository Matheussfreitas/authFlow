import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Task } from "@/types/Task";
import { createTask } from "@/utils/axios";
import { CalendarIcon, Plus } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface CreateTaskModalProps {
  userId: string | undefined;
}

export default function CreateTaskModal({ userId }: CreateTaskModalProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [data, setData] = useState<Date>();
  const [isOpen, setIsOpen] = useState<boolean>(false); // Estado para controlar o modal

  const clearFields = () => {
    setTitle("");
    setDescription("");
    setPriority("");
    setData(undefined);
  };

  const handleCreateTask = async (): Promise<void> => {
    try {
      if (!userId) {
        throw new Error("Usuário não autenticado.");
      }

      const taskData: Task = {
        title,
        description,
        priority,
        dueDate: data,
        status: "PENDENTE",
      };

      console.log("Dados da tarefa: ", taskData);

      const response = await createTask(userId, taskData);

      if (!response.id) {
        throw new Error("Erro ao criar tarefa. Resposta inválida do servidor.");
      }

      console.log("Tarefa criada com sucesso:", response);
      alert("Tarefa criada com sucesso!");

      clearFields(); 
      setIsOpen(false); 
    } catch (error: any) {
      console.error("Erro ao criar tarefa:", error);
      const errorMessage = error.response?.data?.message || error.message || "Erro ao criar tarefa. Tente novamente.";
      alert(errorMessage);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="h-4 w-4" /> Criar Tarefa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="mb-2">
          <DialogTitle>Criar Tarefa</DialogTitle>
          <DialogDescription>Adicione uma nova tarefa</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Label htmlFor="title">Título</Label>
          <Input
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Label htmlFor="description">Descrição</Label>
          <Input
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex items-center gap-x-4">
            <div className="flex-1 flex flex-col gap-4">
              <Label htmlFor="date">Data de vencimento</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !data && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {data ? format(data, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={data} onSelect={setData} locale={ptBR} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <Label htmlFor="priority">Prioridade</Label>
              <Select onValueChange={(value) => setPriority(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Prioridades</SelectLabel>
                    <SelectItem value="URGENTE">URGENTE</SelectItem>
                    <SelectItem value="ALTA">ALTA</SelectItem>
                    <SelectItem value="MEDIA">MEDIA</SelectItem>
                    <SelectItem value="BAIXA">BAIXA</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter className="mt-4 w-full">
          <Button
            type="button"
            className="max-w-xs w-full mx-auto"
            onClick={handleCreateTask}
          >
            Criar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}