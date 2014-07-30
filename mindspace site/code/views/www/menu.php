<ul id="navigation">
    <?
        foreach ($this->items as $item) {
            include(WWW_VIEW_PATH . 'menu_item.php');
        }
    ?>
</ul>
