---
title: Шаблон интернет-магазина Netcat
description: Верстка модульного шаблона
date: 2018-04-20
tags:
  - netcat
  - work
layout: layouts/post.njk
---
[![Скриншот страницы карточки товара](./images/tpl-0.png)](/test/netcat_tpl/item.html)

Главным требованием при верстке была модульность. Файлы разметки и стилей были отдельными у каждого блока. Для адаптива использовали [CSS Element Queries](https://github.com/marcj/css-element-queries), то есть адаптив зависел не от ширины экрана, а от ширины элемента.

Плюсом является то, что у можно вставлять один и тот же блок в разные места сетки, не меняя стилей:

[![Скриншот страницы каталога](./images/tpl-1.png){loading=lazy}](/test/netcat_tpl/catalog.html)

[![Скриншот страницы главной](./images/tpl-2.png){loading=lazy}](/test/netcat_tpl/index.html)
