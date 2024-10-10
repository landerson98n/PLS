import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function RegisterEmployee() {
  return (
    <div className="p-6 bg-[#4B5320]  text-white  rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Cadastrar Funcionários</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white ">Nome</label>
          <Input type="text" placeholder="Nome do funcionário" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-white ">Cargo:</label>
          <Select required>
            <SelectTrigger id="cargo_cliente" className="border-[#FC862D] focus:ring-[#FC862D]">
              <SelectValue placeholder="Selecione o cargo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="piloto">Piloto</SelectItem>
              <SelectItem value="mecanico">Mecânico</SelectItem>
              <SelectItem value="administrativo">Administrativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full">Enviar</Button>
      </form>
    </div>
  )
}