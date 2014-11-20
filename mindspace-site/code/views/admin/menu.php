<ul id="navigation">
    <?
        foreach ($this->items as $item) {
            include(ADMIN_VIEW_PATH . 'menu_item.php');
        }
    ?>
</ul>
<div class="clear"></div>
