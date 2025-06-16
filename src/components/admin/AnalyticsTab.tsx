
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AnalyticsTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Receita por Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Janeiro</span>
                <span className="font-semibold">R$ 45.200</span>
              </div>
              <div className="flex justify-between">
                <span>Fevereiro</span>
                <span className="font-semibold">R$ 52.800</span>
              </div>
              <div className="flex justify-between">
                <span>Março</span>
                <span className="font-semibold">R$ 61.300</span>
              </div>
              <div className="flex justify-between">
                <span>Abril</span>
                <span className="font-semibold">R$ 58.900</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Músicos por Agendamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>João Silva</span>
                <span className="font-semibold">24 shows</span>
              </div>
              <div className="flex justify-between">
                <span>Maria Santos</span>
                <span className="font-semibold">19 shows</span>
              </div>
              <div className="flex justify-between">
                <span>Pedro Costa</span>
                <span className="font-semibold">16 shows</span>
              </div>
              <div className="flex justify-between">
                <span>Ana Lima</span>
                <span className="font-semibold">14 shows</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsTab;
