
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SettingsTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurações da Plataforma</CardTitle>
          <CardDescription>Gerencie as configurações globais do sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-4">Comissões e Taxas</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="commission">Taxa de Comissão (%)</Label>
                <Input id="commission" placeholder="10" />
              </div>
              <div>
                <Label htmlFor="payment-fee">Taxa de Pagamento (%)</Label>
                <Input id="payment-fee" placeholder="3.5" />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Políticas</h4>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cancellation">Política de Cancelamento (horas)</Label>
                <Input id="cancellation" placeholder="24" />
              </div>
            </div>
          </div>

          <Button className="bg-blue-600 hover:bg-blue-700">
            Salvar Configurações
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsTab;
