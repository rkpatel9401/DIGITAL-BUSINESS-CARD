Add-Type -AssemblyName System.Drawing
try {
    $image = [System.Drawing.Bitmap]::FromFile("veer logo .jpg")
    $thumb = $image.GetThumbnailImage(50, 50, $null, [IntPtr]::Zero)
    $colors = @{}
    for ($x=0; $x -lt $thumb.Width; $x++) {
        for ($y=0; $y -lt $thumb.Height; $y++) {
            $pixel = $thumb.GetPixel($x, $y)
            # Ignore white/near-white background
            if ($pixel.R -lt 240 -or $pixel.G -lt 240 -or $pixel.B -lt 240) {
                $rgb = "{0:X2}{1:X2}{2:X2}" -f $pixel.R, $pixel.G, $pixel.B
                if ($colors.ContainsKey($rgb)) { $colors[$rgb]++ } else { $colors[$rgb] = 1 }
            }
        }
    }
    $image.Dispose()
    $thumb.Dispose()
    $colors.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 5 | ForEach-Object { "#" + $_.Name }
} catch {
    Write-Error $_.Exception.Message
}
