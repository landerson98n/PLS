import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function RegisterAircraft() {
  return (
    <div className="p-6 bg-[#4B5320] text-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Cadastrar Aeronave</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white ">Matrícula</label>
          <Input type="text" placeholder="Matrícula da aeronave" require/>
        </div>
        <div>
          <label className="block text-sm font-medium text-white ">Marca:</label>
          <Input type="text" placeholder="Marca da aeronave" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-white ">Modelo:</label>
          <Input type="text" placeholder="Modelo da aeronave" required />
        </div>
        <Button type="submit" className="w-full">Enviar</Button>
      </form>
    </div>
  )
}