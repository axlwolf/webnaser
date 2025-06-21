import re
import os

def generate_sitemap(base_path):
    sitemap = {}
    html_files = []

    # First, find all HTML files
    for root, _, files in os.walk(base_path):
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))

    # Then, parse each HTML file for internal links
    for html_file in html_files:
        file_name = os.path.basename(html_file)
        sitemap[file_name] = []
        try:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
                # Find all href attributes that link to .html files
                links = re.findall(r'href="([^"]+\.html)"', content)
                for link in links:
                    # Normalize path to be relative to the base_path
                    abs_link_path = os.path.abspath(os.path.join(os.path.dirname(html_file), link))
                    relative_link = os.path.relpath(abs_link_path, base_path)
                    if relative_link not in sitemap[file_name] and relative_link.endswith('.html'):
                        sitemap[file_name].append(relative_link)
        except Exception as e:
            print(f"Error reading {html_file}: {e}")

    return sitemap

def create_sitemap_xml(sitemap_data, base_url, output_file):
    xml_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

    for file, links in sitemap_data.items():
        loc = f"{base_url}/{file}"
        xml_content += f'  <url>\n    <loc>{loc}</loc>\n  </url>\n'
        for link in links:
            # Only add internal links that are actual files in the sitemap_data keys
            if os.path.basename(link) in sitemap_data:
                loc = f"{base_url}/{link}"
                xml_content += f'  <url>\n    <loc>{loc}</loc>\n  </url>\n'

    xml_content += '</urlset>'

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(xml_content)

    print(f"Sitemap XML generated at {output_file}")

# Define the base path of your project
project_base_path = '/Users/flanuza/Desktop/web_naser_23/'
# Define the base URL for your website
website_base_url = 'https://www.naser.com.mx'
# Define the output file for the sitemap XML
sitemap_output_file = os.path.join(project_base_path, 'sitemap.xml')

sitemap_info = generate_sitemap(project_base_path)

# Print the sitemap information (optional)
# for file, links in sitemap_info.items():
#     print(f"File: {file}")
#     for link in links:
#         print(f"  Links to: {link}")

create_sitemap_xml(sitemap_info, website_base_url, sitemap_output_file)

# Update memory bank files (conceptual, needs actual implementation based on memory bank structure)
# For now, we'll just print a message indicating this step.
print("Memory bank files would be updated here with sitemap information.")