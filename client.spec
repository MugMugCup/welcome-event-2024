# -*- mode: python ; coding: utf-8 -*-


a = Analysis(
    ['client.py'],
    pathex=[],
    binaries=[],
    datas=[('C:\\Users\\saita\\anaconda3\\envs\\game1\\lib\\site-packages\\eel\\eel.js', 'eel'), ('GUI', 'GUI')],
    hiddenimports=['bottle_websocket'],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='client',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)
