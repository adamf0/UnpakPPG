<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>LAPOR DIRI - PPG</title>
    <meta name="robots" content="noindex, nofollow">

    <!-- Meta Deskripsi -->
    <meta name="description" content="Sistem Pelaporan Data PPG Universitas Pakuan">

    <!-- Meta Keyword -->
    <meta name="keywords" content="Lapor Diri, PPG, Unpak, Universitas Pakuan">

    <!-- Cegah penyisipan iframe dari domain lain (klikjacking protection) -->
    <meta http-equiv="X-Frame-Options" content="DENY">

    <!-- Cegah XSS di browser lama -->
    <meta http-equiv="X-XSS-Protection" content="1; mode=block">

    <!-- Cegah penebakan jenis konten -->
    <meta http-equiv="X-Content-Type-Options" content="nosniff">

    @viteReactRefresh
    @vite(['resources/css/app.css','resources/js/app.jsx'])
</head>
<body>
  @inertia
</body>
</html>