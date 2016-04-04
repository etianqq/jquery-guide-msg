# jquery-guide-msg
A jquery plugin for supporting guide message
## How to use
Configure new feature list in feature.json file. Then bind showGuideMsgBox() action to element selector.

```sh
<script src="js/jquery-1.10.2.js" type="application/javascript"></script>
<script src="js/jquery-guide-msg.js" type="application/javascript"></script>

<body>
<div class="box">
    <button class="pos1">Show new Feature</button>
</div>
<script>
    $(document).ready(function () {
        $(".pos1").showGuideMsgBox("feature1");
    });
</script>
</body>
```