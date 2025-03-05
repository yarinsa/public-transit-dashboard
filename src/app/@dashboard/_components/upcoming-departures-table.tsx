'use client'
import type { Record } from "@/app/api/upcoming-departures/schema";
import { InputGroup } from "@/components/ui/input-group";
import { Box, HStack, Icon, Input, Table, Text, VStack } from "@chakra-ui/react";
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaClock, FaExclamationCircle, FaSearch } from "react-icons/fa";

const useUpcomingDeparturesData =  () => {
  const [data, setData] = useState<Record[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/upcoming-departures')
      const data = await response.json()
      setData(data.data)
    }
    fetchData()
  }, [])
  return {data} 
}
// const data = [
//     { line: 'A1', type: 'Train', destination: 'Central Station', status: 'On Time', nextDeparture: '10:15 AM' },
//     { line: 'T5', type: 'Tram', destination: 'City Center', status: 'On Time', nextDeparture: '10:22 AM' },
//     { line: 'B22', type: 'Bus', destination: 'Airport Terminal', status: '5 min delay', nextDeparture: '10:30 AM' },
//     { line: 'M3', type: 'Metro', destination: 'West Station', status: 'Cancelled', nextDeparture: '10:45 AM' },
//     { line: 'A2', type: 'Train', destination: 'North District', status: '10 min delay', nextDeparture: '10:50 AM' },
//   ]


const helper = createColumnHelper<typeof data[number]>();
const columns = [
    helper.accessor('line', {
      header: 'Line',
    }),
    helper.accessor('type', {
      header: 'Type',
    }),
    helper.accessor('destination', {
      header: 'Destination',
    }),
    helper.accessor('status', {
      header: 'Status',
      cell: ({ getValue }) => {
        let icon, color;
        const value = getValue();
        if (value === 'On Time') {
          icon = FaCheckCircle;
          color = 'green.500';
        } else if (value === 'Cancelled') {
          icon = FaExclamationCircle;
          color = 'red.500';
        } else if (value.includes('delay')) {
          icon = FaClock;
          color = 'orange.500';
        }
        return (
          <HStack gap={2}>
            {icon && <Icon as={icon} color={color} />}
            <Text>{value}</Text>
          </HStack>
        );
      },
    }),
    helper.accessor('nextDeparture', {
      header: 'Next Departure',
      cell: ({ getValue }) => {
        const value = getValue();
        const localTime = new Date(value).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jerusalem' });
        return localTime;
      },
    }),
  ];

export const UpcomingDeparturesTable = () => {
  const {data} = useUpcomingDeparturesData();
  const [globalFilter, setGlobalFilter] = useState("");
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableGlobalFilter: true,
    getRowId: (row) => row.line,
    filterFns: {
        text: (row, columnId, filterValue) => {
            const rowValue = row.getValue(columnId);
            return String(rowValue).toLowerCase().includes(String(filterValue).toLowerCase());
        }
    },
   state: {
    globalFilter,
   },
   onGlobalFilterChange: setGlobalFilter,
   globalFilterFn: (row, columnId, filterValue) => {
    const rowValue = row.getValue(columnId);
    return String(rowValue).toLowerCase().includes(String(filterValue).toLowerCase());
   }
  });

  return (
    <Box
    bg="white" _dark={{ bg: "gray.800" }} 
      p={4}
      width="100%"
      borderRadius="md"
    >
      <VStack align="start" gap={4}>
        <Text fontSize="lg" fontWeight="bold">
          Upcoming Departures
        </Text>
        <InputGroup startElement={<Icon as={FaSearch} />} >
          <Input
            placeholder="Search by line or destination..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            width="100%"
          />

        </InputGroup>
        <Table.Root variant="outline" width="100%">
          <Table.Header>
            {table.getHeaderGroups().map(headerGroup => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map(column => (
                  <Table.ColumnHeader
                    key={column.id}
                    fontWeight="bold"
                    borderBottom="1px solid"
                    textAlign="left"
                  >
                    <HStack gap={1}>
                      {flexRender(column.column.columnDef.header, column.getContext())}
                    </HStack>
                  </Table.ColumnHeader>
                ))}
              </Table.Row>
            ))}
          </Table.Header>
          <Table.Body>
            {table.getRowModel().rows.map(row => (
              <Table.Row key={row.id} borderBottom="1px solid" >
                {row.getVisibleCells().map(cell => (
                  <Table.Cell key={cell.id} textAlign="left">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </VStack>
    </Box>
  );
};