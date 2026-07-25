$excel = New-Object -ComObject Excel.Application
$file = Get-ChildItem -Filter "*2024*.xlsx" | Select-Object -First 1
$workbook = $excel.Workbooks.Open($file.FullName)
$sheet = $workbook.Sheets.Item(1)
$usedRange = $sheet.UsedRange
$data = @()
for ($row = 1; $row -le $usedRange.Rows.Count; $row++) {
    $rowData = @()
    for ($col = 1; $col -le 10; $col++) {
        $cell = $usedRange.Cells.Item($row, $col)
        $rowData += $cell.Text
    }
    $data += ($rowData -join "`t")
}
$workbook.Close($false)
$excel.Quit()
$data | Out-File -FilePath "d:\antigravity\Organizational Nurse Management Work Plan\excel_content.txt" -Encoding utf8
