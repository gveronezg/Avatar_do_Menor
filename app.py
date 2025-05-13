import xml.etree.ElementTree as ET
import os
from flask import Flask, render_template

app = Flask(__name__)

def parse_skin_xml(xml_path):
    import xml.etree.ElementTree as ET
    tree = ET.parse(xml_path)
    root = tree.getroot()
    tints = {}

    for sub in root.findall('SubTexture'):
        name = sub.get('name')  # ex: tint7_arm.png
        if not name.startswith('tint'):
            continue
        tint, part = name.split('_')
        part = part.replace('.png', '')
        if tint not in tints:
            tints[tint] = {}
        tints[tint][part] = {
            'x': int(sub.get('x')),
            'y': int(sub.get('y')),
            'width': int(sub.get('width')),
            'height': int(sub.get('height'))
        }
    return tints

@app.route('/')
def index():
    xml_path = os.path.join(app.static_folder, 'img/sheet_skin.xml')
    tints = parse_skin_xml(xml_path)
    tint_names = sorted(tints.keys())  # ['tint1', 'tint2', ...]
    return render_template('index.html', tints=tints, tint_names=tint_names)

if __name__ == '__main__':
    app.run(debug=True)
