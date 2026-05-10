from playwright.sync_api import sync_playwright, expect

def verify_homepage(page):
    page.goto("http://localhost:3000")
    # Wait for the hero section to load
    page.wait_for_selector("h1")
    page.screenshot(path="verification/homepage.png", full_page=True)
    print("Homepage screenshot taken")

def verify_shop(page):
    page.goto("http://localhost:3000/shop")
    page.wait_for_selector("h1")
    page.screenshot(path="verification/shop.png", full_page=True)
    print("Shop page screenshot taken")

def verify_auth(page):
    page.goto("http://localhost:3000/auth/login")
    page.wait_for_selector("h1")
    page.screenshot(path="verification/login.png")
    print("Login page screenshot taken")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_homepage(page)
            verify_shop(page)
            verify_auth(page)
        except Exception as e:
            print(f"An error occurred: {e}")
        finally:
            browser.close()
