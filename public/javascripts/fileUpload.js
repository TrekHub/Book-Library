FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode

)

FilePond.setOptions({
    stylePanelAspectRatio: 150 / 100,
    imageResizeTargetHeight: 250,
    imageResizeTargetWidth: 250
})

FilePond.parse(document.body);