//Dont change it
requirejs(['ext_editor_1', 'jquery_190', 'raphael_210'],
    function (ext, $, TableComponent) {

        var cur_slide = {};

        ext.set_start_game(function (this_e) {
        });

        ext.set_process_in(function (this_e, data) {
            cur_slide["in"] = data[0];
        });

        ext.set_process_out(function (this_e, data) {
            cur_slide["out"] = data[0];
        });

        ext.set_process_ext(function (this_e, data) {
            cur_slide.ext = data;
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_process_err(function (this_e, data) {
            cur_slide['error'] = data[0];
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_animate_success_slide(function (this_e, options) {
            var $h = $(this_e.setHtmlSlide('<div class="animation-success"><div></div></div>'));
            this_e.setAnimationHeight(115);
        });

        ext.set_animate_slide(function (this_e, data, options) {
            var $content = $(this_e.setHtmlSlide(ext.get_template('animation'))).find('.animation-content');
            if (!data) {
                console.log("data is undefined");
                return false;
            }

            var checkioInput = data.in;

            if (data.error) {
                $content.find('.call').html('Fail: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.output').html(data.error.replace(/\n/g, ","));

                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
                $content.find('.answer').remove();
                $content.find('.explanation').remove();
                this_e.setAnimationHeight($content.height() + 60);
                return false;
            }

            var rightResult = data.ext["answer"];
            var userResult = data.out;
            var result = data.ext["result"];
            var result_addon = data.ext["result_addon"];


            //if you need additional info from tests (if exists)
            var explanation = data.ext["explanation"];

            $content.find('.output').html('&nbsp;Your result:&nbsp;' + JSON.stringify(userResult));

            if (!result) {
                $content.find('.call').html('Fail: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.answer').html('Right result:&nbsp;' + JSON.stringify(rightResult));
                $content.find('.answer').addClass('error');
                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
            }
            else {
                $content.find('.call').html('Pass: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.answer').remove();
            }
            //Dont change the code before it
            var canvas = new StairCanvas($content.find(".explanation")[0]);
            canvas.createCanvas(checkioInput, explanation);


            this_e.setAnimationHeight($content.height() + 60);

        });

       

        var colorOrange4 = "#F0801A";
        var colorOrange3 = "#FA8F00";
        var colorOrange2 = "#FAA600";
        var colorOrange1 = "#FABA00";

        var colorBlue4 = "#294270";
        var colorBlue3 = "#006CA9";
        var colorBlue2 = "#65A1CF";
        var colorBlue1 = "#8FC7ED";

        var colorGrey4 = "#737370";
        var colorGrey3 = "#9D9E9E";
        var colorGrey2 = "#C5C6C6";
        var colorGrey1 = "#EBEDED";

        var colorWhite = "#FFFFFF";
        
        function StairCanvas(dom){
            var x0 = 10,
                y0 = 10,
                cellSize = 30;
            var cellN;
            var fullSizeX;
            var fullSizeY;
            var paper;
            var kUp = 0.2;
            var kPad = 0.1;

            var attrEdgeStep = {"stroke": colorGrey4, "stroke-width": 6, "stroke-linecap": "round"};
            var attrStep = {"stroke": colorGrey4, "stroke-width": 3, "stroke-linecap": "round"};
            var attrRoute = {"stroke": colorOrange4, "stroke-width": 3, "stroke-linecap": "round", "arrow-end": "classic-midium-long"};
            var attrNumb = {"stroke": colorBlue4, "font-size": cellSize * 0.5, "font-family": "Verdana"};

            this.createCanvas = function(numbers, route) {
                cellN = numbers.length;
                fullSizeX = x0 * 2 + cellSize * (numbers.length + 2);
                fullSizeY = fullSizeX + cellSize;
                paper = Raphael(dom, fullSizeX, fullSizeY, 0, 0);

                paper.path(Raphael.format(
                    "M{0},{1}H{2}",
                    x0,
                    fullSizeY - y0 - cellSize,
                    x0 + cellSize
                    )).attr(attrEdgeStep);
                paper.text(
                    x0 + cellSize / 2,
                    fullSizeY - (y0 + cellSize / 2),
                    "0"
                    ).attr(attrNumb);
                paper.path(Raphael.format(
                    "M{0},{1}H{2}",
                    x0 + (cellN + 1) * cellSize,
                    y0 + cellSize,
                    fullSizeX - x0
                    )).attr(attrEdgeStep);
                paper.text(
                    x0 + (cellN + 1.5) * cellSize,
                    y0 + cellSize * 1.5,
                    "0"
                    ).attr(attrNumb);

                for (var i = 0; i < cellN; i++) {
                    paper.path(Raphael.format(
                        "M{0},{1}V{2}",
                        x0 + cellSize + cellSize * i,
                        fullSizeY - (y0 + cellSize + cellSize * i),
                        fullSizeY - (y0 + cellSize * (i + 2))
                        )).attr(attrStep);
                    paper.path(Raphael.format(
                        "M{0},{1}H{2}",
                        x0 + (i + 1) * cellSize,
                        fullSizeY - (y0 + cellSize * (i + 2)),
                        x0 + (i + 2) * cellSize
                        )).attr(attrStep);
                    paper.text(
                        x0 + (i + 1.6) * cellSize,
                        fullSizeY - (y0 + cellSize * (i + 1.5)),
                        numbers[i]
                        ).attr(attrNumb);
                }
                paper.path(Raphael.format(
                    "M{0},{1}V{2}",
                    x0 + cellSize + cellSize * i,
                    fullSizeY - (y0 + cellSize + cellSize * i),
                    fullSizeY - (y0 + cellSize * (i + 2))
                    )).attr(attrStep);
                var newRoute = [1];
                for (i = 0; i < route.length; i++) {
                    newRoute.push(route[i]);
                }
                newRoute.push(1);
                var stPoint = [x0 + cellSize / 2, fullSizeY - (y0 + cellSize * (1 + kUp))];
                var endPoint;
                for (i = 1; i < newRoute.length; i++) {
                    if (newRoute[i] === 0) {
                        continue;
                    }
                    endPoint = [x0 + cellSize * (i + 0.5), fullSizeY - (y0 + cellSize * (i + 1 + kUp))];
                    paper.path(Raphael.format(
                        "M{0},{1}C{0},{4},{2},{5},{2},{3}",
                        stPoint[0] + cellSize * kPad,
                        stPoint[1],
                        endPoint[0] - cellSize * kPad,
                        endPoint[1],
                        endPoint[1] - cellSize * (2 - kUp),
                        endPoint[1] - cellSize * (1 - kUp)
                        )).attr(attrRoute);
                    stPoint = endPoint;
                }
            };
        }

    }
);
