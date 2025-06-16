
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Booking {
  id: number;
  musician: string;
  client: string;
  event: string;
  date: string;
  value: number;
  status: string;
}

interface BookingsTabProps {
  mockBookings: Booking[];
  getStatusIcon: (status: string) => React.ReactNode;
  getStatusColor: (status: string) => string;
}

const BookingsTab = ({ mockBookings, getStatusIcon, getStatusColor }: BookingsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Todos os Agendamentos</CardTitle>
        <CardDescription>Monitore e gerencie agendamentos da plataforma</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockBookings.map(booking => (
            <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                {getStatusIcon(booking.status)}
                <div>
                  <h4 className="font-semibold">{booking.event}</h4>
                  <p className="text-sm text-gray-600">
                    {booking.musician} → {booking.client}
                  </p>
                  <p className="text-sm text-gray-500">{booking.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-semibold">R$ {booking.value}</p>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status === 'confirmed' ? 'Confirmado' :
                     booking.status === 'pending' ? 'Pendente' : 
                     booking.status === 'completed' ? 'Concluído' : booking.status}
                  </Badge>
                </div>
                <Button size="sm" variant="outline">
                  Detalhes
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingsTab;
