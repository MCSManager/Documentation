# Custom Layout

:::tip
Due to the highly customizable interface, the panel display language cannot be switched after setting a custom page. Forced switching may not have the desired effect.
:::

## Cardization

Starting from `MCSManager v10`, users can customize any visible page by dragging and dropping cards.

![preview](./../../images/custom_page/preview.gif)

## Customize

::: warning

Please add cards as needed. If too many cards are added to a page, the performance of the web page may decrease.

:::

Click the custom layout button in the upper right corner of the panel on any interface to enter editing mode.

In edit mode, you can insert a card anywhere, modify the card title, adjust the card size, etc.

Available cards include but are not limited to time, music, pictures, web pages, panel information, instances, and settings. Everything you see in the panel is a card.

![custom_button](./../../images/custom_page/custom_button.png)

![custom_view](./../../images/custom_page/custom_view.png)

## More than just the homepage

In addition to several common management pages, MCSManager also allows you to edit various accessible pages such as login pages, ordinary user homepages, and open pages.

![custom_login_page](./../../images/custom_page/custom_login_page.png)

## Manage multiple instances on the home page

The ability to customize layouts allows you to manage multiple instances on a single page.

![terminal_in_home_page](./../../images/custom_page/terminal_in_home_page.png)

## Extensibility

The card has extremely high scalability. It allows you to connect to the server using SSH while listening to music in the panel.

![music_and_ssh](./../../images/custom_page/music_and_ssh.png)

## HTML Card

You can upload custom HTML as the content of the card. Custom HTML cards have very high scalability. Using custom HTML, you can [self-develop](../apis/html_card.html) more cards or install them. Useful cards developed by others. However, you need to pay attention to security issues when using it. Uploading code from unknown sources may lead to the panel being invaded.

![extend_page_card](./../../images/custom_page/extend_page_card.png)

![html_card](./../../images/custom_page/html_card.png)
