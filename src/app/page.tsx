'use client'
import React, { useState } from 'react'
import { Airplay, Bell, ChevronDown, Frame, Plane } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RegisterService } from '@/components/register-service'
import { RegisterExpense } from '@/components/expense-filter'
import { RegisterEmployee } from '@/components/register-employee'
import { RegisterAircraft } from '@/components/register-aircraft'
import { ServiceList } from '@/components/service-list'
import { ExpenseList } from '@/components/expense-list'
import { DashboardPage } from '@/components/dashboard'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function Dashboard() {
  const [activeComponent, setActiveComponent] = useState('dashboard')

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'register':
        return <RegisterService />
      case 'expenses':
        return <RegisterExpense />
      case 'employees':
        return <RegisterEmployee />
      case 'aircraft':
        return <RegisterAircraft />
      case 'list-expenses':
        return <ExpenseList />
      case 'services':
        return <ServiceList />
      case 'dashboard':
      default:
        return <DashboardPage />
    }
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#556B2F] shadow-md">
        <div className="p-4 flex items-center gap-2">
          <Plane className="w-8 h-8 text-white" />
          <span className="text-xl font-bold">PLS</span>
        </div>
        <nav className="mt-6 text-white">
          {[
            { name: 'Dashboard', key: 'dashboard' },
            { name: 'Registrar', key: 'register' },
            { name: 'Listar Serviços', key: 'services' },
            { name: 'Aeronaves', key: 'aircraft' },
            { name: 'Despesas', key: 'expenses' },
            { name: 'Funcionários', key: 'employees' },
            { name: 'Listar Despesas', key: 'list-expenses' },
          ].map((item) => (
            <a
              key={item.key}
              href="#"
              className={`block py-2 px-4 text-white hover:bg-black ${activeComponent === item.key ? 'bg-black font-semibold' : ''
                }`}
              onClick={() => setActiveComponent(item.key)}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className='w-[30%]'>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a safra" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023/2024">Safra 2023/2024</SelectItem>
                  <SelectItem value="2022/2023">Safra 2022/2023</SelectItem>
                  <SelectItem value="2021/2022">Safra 2021/2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="flex items-center gap-2">
                Samuel
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {renderActiveComponent()}
        </div>
      </main>
    </div>
  )
}