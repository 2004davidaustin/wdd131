import os
from pathlib import Path

def find_html_files(directory):
    """Find all HTML files in the directory and subdirectories."""
    html_files = []
    base_dir = Path(directory)
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith('.html'):
                file_path = Path(root) / file
                relative_path = file_path.relative_to(base_dir)
                html_files.append({
                    'name': file,
                    'path': str(relative_path)
                })
    
    return html_files

# Get the directory where this script is located
script_dir = Path(__file__).parent

# Find all HTML files
html_files = find_html_files(script_dir)

# Generate file items HTML
file_items = []
for file in html_files:
    url = f"https://2004davidaustin.github.io/wdd131/{file['path'].replace(os.sep, '/')}"
    
    # Get the parent folder name
    path_parts = Path(file['path']).parts
    if len(path_parts) > 1:
        # If file is in a subfolder, use the folder name
        folder_name = path_parts[-2]
    else:
        # If file is in the root directory, use the filename without extension
        folder_name = Path(file['name']).stem
    
    file_items.append(f"""        <div class="file-item">
            <a href="{url}" target="">{folder_name}</a>
            <div class="file-path">{file['path']}</div>
        </div>""")

# Generate HTML content
html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Files Index</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f5f5f5;
        }}
        h1 {{
            color: #333;
            border-bottom: 3px solid #007bff;
            padding-bottom: 10px;
        }}
        .file-list {{
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }}
        .file-item {{
            padding: 12px;
            margin: 8px 0;
            border-left: 4px solid #007bff;
            background-color: #f8f9fa;
            transition: background-color 0.2s;
        }}
        .file-item:hover {{
            background-color: #e9ecef;
        }}
        a {{
            color: #007bff;
            text-decoration: none;
            font-weight: bold;
            font-size: 1.1em;
        }}
        a:hover {{
            text-decoration: underline;
        }}
        .file-path {{
            color: #666;
            font-size: 0.9em;
            margin-top: 4px;
        }}
        .count {{
            color: #666;
            font-style: italic;
            margin-bottom: 20px;
        }}
    </style>
</head>
<body>
    <h1>WDD131 Projects</h1>
    <p class="count">Found {len(html_files)} HTML file(s)</p>
    <div class="file-list">
{chr(10).join(file_items)}
    </div>
</body>
</html>"""

# Write the HTML file
output_path = script_dir / 'index.html'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(html_content)

print(f'Found {len(html_files)} HTML file(s)')
print('index.html has been generated successfully!')