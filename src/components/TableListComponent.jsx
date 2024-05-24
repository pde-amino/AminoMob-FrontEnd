import React, { useState, useEffect } from "react";
import { DataTable } from "react-native-paper";

const TableListComponent = ({ data }) => {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([10, 50, 100]);
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[0]);
  const [items, setItems] = useState([]);

  console.log("ksjdksjdk :", data);
  useEffect(() => {
    // Mapping data dari parent component ke format yang sesuai
    const mappedData = data.map((item, index) => ({
      key: index, // Gunakan item.id jika ada, jika tidak gunakan index
      name: item.nm_bed,
      kosong: item.bed_kosong,
      isi: item.jumlah_bed,
      total: item.jumlah_bed,
    }));

    setItems(mappedData);
  }, [data]);
  //   console.log("Dari Table Component :", data);
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Ruang</DataTable.Title>
        <DataTable.Title numeric>Bad Isi</DataTable.Title>
        <DataTable.Title numeric>Bad Kosong</DataTable.Title>
        <DataTable.Title numeric>Bad Total</DataTable.Title>
      </DataTable.Header>

      {items.slice(from, to).map((item) => (
        <DataTable.Row key={item.key}>
          <DataTable.Cell>{item.name}</DataTable.Cell>
          <DataTable.Cell numeric>{item.kosong}</DataTable.Cell>
          <DataTable.Cell numeric>{item.jumlah}</DataTable.Cell>
          <DataTable.Cell numeric>{item.jumlah}</DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        showFastPaginationControls
        selectPageDropdownLabel={"Rows per page"}
      />
    </DataTable>
  );
};

export default TableListComponent;
