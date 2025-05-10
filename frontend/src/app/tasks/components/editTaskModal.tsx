import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Task } from "@/types/Task";

interface TaskEditDialogProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedTask: any) => void;
}

export default function EditTaskModal({ task, open, onOpenChange, onSave }: TaskEditDialogProps) {
  const [title, setTitle] = useState<string>(task.title);
  const [description, setDescription] = useState<string>(task.description);
  const [priority, setPriority] = useState<string>(task.priority);
  const [data, setData] = useState<Date | undefined>(task.dueDate ? new Date(task.dueDate) : undefined);

  const handleSaveTask = (): void => {
    const updatedTask = {
      ...task,
      title,
      description,
      priority,
      dueDate: data,
    };

    onSave(updatedTask);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogTrigger asChild>
        <Button variant="ghost" className="cursor-pointer">
          <Edit className="h-4 w-4 text-gray-500" />
        </Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="mb-2">
          <DialogTitle>Editar Tarefa</DialogTitle>
          <DialogDescription>Edite uma tarefa existente</DialogDescription>
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
              <Select value={priority} onValueChange={(value) => setPriority(value)}>
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
            onClick={handleSaveTask}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}