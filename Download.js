function downloadAbyss() {
    const url = "https://github.com/DaCoderMane/AbyssDir/raw/refs/heads/main/Abyss.zip";
    const link = document.createElement('a');
    link.href = url;
    link.download = "AbyssDevBuild.rar";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}