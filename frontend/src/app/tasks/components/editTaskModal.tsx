import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";

export default function EditTaskModal({task}: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="cursor-pointer">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="mb-2">
          <DialogTitle>Editar Tarefa</DialogTitle>
          <DialogDescription>Edite uma tarefa existente</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Label htmlFor="title">Título</Label>
          <Input placeholder="Título" />
          <Label htmlFor="description">Descrição</Label>
          <Input placeholder="Descrição" />
          <Label htmlFor="priority">Prioridade</Label>
          <div className="flex justify-around">
            <Checkbox id="priority" />
            <Label htmlFor="priority">Urgente</Label>
            <Checkbox id="priority" />
            <Label htmlFor="priority">Alta</Label>
            <Checkbox id="priority" />
            <Label htmlFor="priority">Média</Label>
            <Checkbox id="priority" />
            <Label htmlFor="priority">Baixa</Label>
          </div>
        </div>
        <DialogFooter className="mt-4 w-full">
          <Button type="submit" className="max-w-xs w-full mx-auto">Editar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog> 
  )
}