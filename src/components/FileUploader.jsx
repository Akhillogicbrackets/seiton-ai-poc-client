'use client';

import { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Typography,
  Stack,
} from '@mui/material';

import data from '@/data/data.json';

import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

import SvgIcon from './SvgIcon';
import { IconType } from '@/enum';

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import PageLoader from '@/images/graphics/PageLoader';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImageIcon from '@mui/icons-material/Image';
import TableChartIcon from '@mui/icons-material/TableChart';
import ArticleIcon from '@mui/icons-material/Article';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


export default function FileUploader() {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [fileName, setFileName] = useState('uploaded-data');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [tableData, setTableData] = useState(data);


  const FileIcon = ({ fileType, fileName }) => {
    const ext = fileName.split('.').pop()?.toLowerCase();

    if (fileType.startsWith('image/')) {
      return <ImageIcon sx={{ fontSize: 48, color: 'primary.main' }} />;
    }

    if (ext === 'pdf') {
      return <PictureAsPdfIcon sx={{ fontSize: 48, color: 'error.main' }} />;
    }

    if (['xls', 'xlsx', 'csv'].includes(ext)) {
      return <TableChartIcon sx={{ fontSize: 48, color: 'success.main' }} />;
    }

    if (['doc', 'docx'].includes(ext)) {
      return <ArticleIcon sx={{ fontSize: 48, color: 'info.main' }} />;
    }

    return <InsertDriveFileIcon sx={{ fontSize: 48, color: 'text.secondary' }} />;
  };


  const processFileApi = async (file) => {
    // Example API call (replace later)
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('File processing failed');
    }

    return response.json(); // processed data later
  };


  const columns = useMemo(() => {
    if (!tableData?.length) return [];
    return Object.keys(tableData[0]).map((key) => ({
      accessorKey: key,
      header: key,
    }));
  }, []);

  const handleRemoveFile = () => {
  setUploadedFile(null);
  setShowTable(false);
  setTableData([]);
  setFileName('uploaded-data');
};


  const handleFileUpload = async (e) => {
  const file = e?.target?.files?.[0];
  if (!file) return;

  setUploadedFile(null);
  setShowTable(false);

  setUploadedFile({
    name: file.name,
    size: `${(file.size / 1024).toFixed(2)} KB`,
    type: file.type || 'Unknown',
    preview: file.type.startsWith('image/')
      ? URL.createObjectURL(file)
      : null,
  });

  setFileName(file.name.replace(/\.[^/.]+$/, ''));

  try {
    setIsProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setShowTable(true);
  } catch (error) {
    console.error(error);
    alert('Failed to process file');
  } finally {
    setIsProcessing(false);
  }
};



  // // ================= EXPORT PDF =================
  // const exportPDF = (rows) => {

  //   const doc = new jsPDF();
  //   const tableData = rows.map((row) => Object.values(row.original));
  //   const tableHeaders = columns.map((c) => c.header);

  //   autoTable(doc, {
  //     head: [tableHeaders],
  //     body: tableData,
  //   });

  //   doc.save(`${fileName}.pdf`);
  // };

  const exportExcel = async (rows) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    // Generate columns dynamically
    worksheet.columns = columns.map((col) => ({
      header: col.header,
      key: col.accessorKey,
      width: 20,
    }));

    // Add rows
    rows.forEach((row) => {
      worksheet.addRow(row.original);
    });

    // Style header
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = {
        bold: true,
        size: 14,
      };
      cell.alignment = {
        horizontal: 'center',
        vertical: 'middle',
      };
      cell.border = {
        bottom: { style: 'thick' },
      };
    });

    worksheet.getRow(1).height = 28;

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(blob, `${fileName}.xlsx`);
  };


  const table = useMaterialReactTable({
    columns,
    data,
    // enableRowSelection: true,
    renderTopToolbarCustomActions: ({ table }) => (
      <Stack direction="row" spacing={2} sx={{ p: 1 }}>
        <Button
          startIcon={<FileDownloadIcon />}
          onClick={() =>
            exportExcel(table.getPrePaginationRowModel().rows)
          }
        >
          Export Excel
        </Button>

        {/* <Button
          startIcon={<FileDownloadIcon />}
          onClick={() =>
            exportPDF(table.getPrePaginationRowModel().rows)
          }
        >
          Export PDF
        </Button> */}
      </Stack>
    ),
  });

  return (
    <>
      <Box
        sx={{
          maxWidth: 900,
          mx: 'auto',
          mt: 6,
          p: 5,
          borderRadius: 3,
          border: '2px dashed',
          borderColor: isDragging ? 'primary.main' : 'divider',
          textAlign: 'center',
          bgcolor: 'background.paper',
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
      >
        <Stack spacing={2} alignItems="center">
          <SvgIcon
            name="custom-upload-icon"
            size={80}
            color="primary.main"
            type={IconType.CUSTOM}
          />

          <Typography variant="h6" fontWeight={600}>
            Drag files to upload
          </Typography>

          <Button variant="contained" component="label">
            Select file
            <input hidden type="file" onChange={handleFileUpload} />
          </Button>
        </Stack>
      </Box>

      {uploadedFile && !isProcessing && (
        <Box
          sx={{
            maxWidth: 900,
            mx: 'auto',
            mt: 3,
            p: 2,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            {uploadedFile.preview ? (
              <Box
                component="img"
                src={uploadedFile.preview}
                sx={{
                  width: 64,
                  height: 64,
                  objectFit: 'cover',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              />
            ) : (
              <FileIcon
                fileType={uploadedFile.type}
                fileName={uploadedFile.name}
              />
            )}

            <Box flexGrow={1}>
              <Typography fontWeight={600}>
                {uploadedFile.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {uploadedFile.type} • {uploadedFile.size}
              </Typography>
            </Box>

            {/* DELETE BUTTON */}
            <IconButton
              color="error"
              onClick={handleRemoveFile}
              aria-label="Remove file"
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Box>
      )}


      {isProcessing && (
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <PageLoader />
          <Typography mt={2}>Processing file…</Typography>
        </Box>
      )}

      {showTable && (
        <Box
          sx={{
            maxWidth: 1400,
            mx: 'auto',
            mt: 4,
            px: { xs: 2, md: 3 },
          }}
        >
          <MaterialReactTable table={table} />
        </Box>
      )}
    </>
  );
}
