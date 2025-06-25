import * as React from 'react';
import { useState } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import MainList from './MainList';

export interface ITermination2AProps {
  functionUrl: string; // Passed from Termination2AWebPart.ts
}

const Termination2A: React.FC<ITermination2AProps> = ({ functionUrl }) => {
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  const handleOpenEmployee = (email: string) => {
    console.log("Open details for:", email);
    setSelectedEmployee(email);

    // 🔄 Later: navigate to EmployeeForm or open a panel
  };

  return (
    <Stack tokens={{ childrenGap: 20, padding: 20 }}>
      <h1>Termination System – HR View</h1>
      <MainList functionUrl={functionUrl} onOpenEmployee={handleOpenEmployee} />
      {selectedEmployee && (
        <div>
          <p><strong>Selected employee:</strong> {selectedEmployee}</p>
          {/* 🔄 Later: Render <EmployeeForm email={selectedEmployee} /> here */}
        </div>
      )}
    </Stack>
  );
};

export default Termination2A;
