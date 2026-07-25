$json = ConvertFrom-Json (Get-Content form1_data.json -Raw -Encoding UTF8)
$questions = $json[1][1]
$output = @()

foreach ($q in $questions) {
    if ($null -ne $q[1] -and $q[1] -ne "") {
        $title = $q[1]
        $type = $q[3]
        $entry_id = ""
        $options = @()
        if ($null -ne $q[4] -and $q[4].Count -gt 0) {
            $entry_id = $q[4][0][0]
            if ($null -ne $q[4][0][1]) {
                foreach ($opt in $q[4][0][1]) {
                    $options += $opt[0]
                }
            }
        }
        $obj = [PSCustomObject]@{
            Title = $title
            Type = $type
            EntryId = "entry.$entry_id"
            Options = $options -join " | "
        }
        $output += $obj
    }
}
$output | ConvertTo-Json -Depth 3 | Set-Content form1_parsed.json -Encoding UTF8

$json2 = ConvertFrom-Json (Get-Content form2_data.json -Raw -Encoding UTF8)
$questions2 = $json2[1][1]
$output2 = @()

foreach ($q in $questions2) {
    if ($null -ne $q[1] -and $q[1] -ne "") {
        $title = $q[1]
        $type = $q[3]
        $entry_id = ""
        $options = @()
        if ($null -ne $q[4] -and $q[4].Count -gt 0) {
            $entry_id = $q[4][0][0]
            if ($null -ne $q[4][0][1]) {
                foreach ($opt in $q[4][0][1]) {
                    $options += $opt[0]
                }
            }
        }
        $obj = [PSCustomObject]@{
            Title = $title
            Type = $type
            EntryId = "entry.$entry_id"
            Options = $options -join " | "
        }
        $output2 += $obj
    }
}
$output2 | ConvertTo-Json -Depth 3 | Set-Content form2_parsed.json -Encoding UTF8
