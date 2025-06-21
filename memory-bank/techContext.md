## Tech Context

### Frontend Technologies
-   **HTML5**: Standard markup language for creating web pages.
-   **CSS3**: Styling language, including custom styles (`assets/css/styles.css`), Font Awesome for icons (`assets/css/fontawesome.css`), and Owl Carousel styles (`assets/css/owl.css`).
-   **JavaScript**: Used for interactive elements, preloader functionality, and the Crisp chat integration.
-   **Bootstrap**: Frontend framework for responsive design and UI components (`vendor/bootstrap/css/bootstrap.min.css`).

### Libraries and Frameworks
-   **jQuery**: Likely used by Bootstrap and other scripts for DOM manipulation and event handling.
-   **Owl Carousel**: Used for the main banner slider (`assets/css/owl.css`).

### External Services/APIs
-   **Crisp Chat**: Live chat support integration (`https://client.crisp.chat/l.js`).
-   **Google Fonts**: Poppins font family (`https://fonts.googleapis.com/css?family=Poppins`).

### Development Environment
-   **Local Development**: Files are served locally from `/Users/flanuza/Desktop/web_naser_23/`.

### Sitemap Generation
-   **Python Script**: A custom Python script (`generate_sitemap.py`) is used to dynamically generate `sitemap.xml` by parsing HTML files and extracting internal links.

### File Structure (Relevant to Tech)
-   `index.html`: Main entry point of the website.
-   `vendor/bootstrap/`: Contains Bootstrap framework files.
-   `assets/css/`: Contains custom CSS and other styling assets.
-   `assets/images/`: Stores website images, including `logo_naser.png`.
-   `sitemap.xml`: Generated XML sitemap for SEO.
-   `generate_sitemap.py`: Python script for sitemap generation.