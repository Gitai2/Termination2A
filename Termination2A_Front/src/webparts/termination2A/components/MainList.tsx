import * as React from 'react';
import { useEffect, useState } from 'react';
import { DetailsList, DetailsListLayoutMode, IColumn, PrimaryButton } from '@fluentui/react';
import { Stack } from '@fluentui/react/lib/Stack';

interface IEmployee {
  Employee_Name_Termination2A: string;
  Employee_EMail_Termination2A: string;
  Leaving_Reason_Termination2A: string;
}

interface IMainListProps {
  functionUrl: string; // passed from WebPart.tsx
  onOpenEmployee: (email: string) => void;
}

const MainList: React.FC<IMainListProps> = ({ functionUrl, onOpenEmployee }) => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  useEffect(() => {
    fetch(functionUrl)
      .then(response => response.json())
      .then(data => {
        setEmployees(data);
      })
      .catch(error => {
        console.error("Error fetching employee list:", error);
      });
  }, [functionUrl]);

  const columns: IColumn[] = [
    {
      key: 'column1',
      name: 'Name',
      fieldName: 'Employee_Name_Termination2A',
      minWidth: 150,
      isResizable: true
    },
    {
      key: 'column2',
      name: 'Email',
      fieldName: 'Employee_EMail_Termination2A',
      minWidth: 200,
      isResizable: true
    },
    {
      key: 'column3',
      name: 'Leaving Reason',
      fieldName: 'Leaving_Reason_Termination2A',
      minWidth: 150,
      isResizable: true
    },
    {
      key: 'column4',
      name: '',
      minWidth: 50,
      onRender: (item: IEmployee) => (
        <PrimaryButton text="+" onClick={() => onOpenEmployee(item.Employee_EMail_Termination2A)} />
      )
    }
  ];

  return (
    <Stack tokens={{ childrenGap: 20, padding: 20 }}>
      <h2>Employee Termination List</h2>
      <DetailsList
        items={employees}
        columns={columns}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        selectionPreservedOnEmptyClick={true}
      />
    </Stack>
  );
};

export default MainList;
