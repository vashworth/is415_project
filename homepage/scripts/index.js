(function(context) {
    champs_json = JSON.parse(context.champs);

    function findChampion(find) {
        for (var ch in champs_json){
            if (champs_json[ch]['fields'].name === find){
                return ch;
            }
        }
    }

    $("#PredictForm").submit(function(event) {
        event.preventDefault();
        EasyLoading.show();
        $.ajax({
            data: $(this).serialize(),
            type: $(this).attr('method'),
            url: $(this).attr('action'),
            success: function(data) {
                data = JSON.parse(data);
                a = [];

                for (var s in data["Results"]["output1"][0]) {
                    if (s.includes("Scored Probabilities")) {
                        value = data["Results"]["output1"][0][s];
                        s = s.split(/"/)[1];
                        var champ = {
                            name: s,
                            probability: value
                        };
                        a.push(champ);
                    }
                }

                function compare(a, b) {
                    if (a.probability > b.probability)
                        return -1;
                    if (a.probability < b.probability)
                        return 1;
                    return 0;
                }

                as = a.sort(compare)
                rec1 = findChampion(as[0].name);
                rec2 = findChampion(as[1].name);
                rec3 = findChampion(as[2].name);
                rec4 = findChampion(as[3].name);
                rec5 = findChampion(as[4].name);

                // RECOMMENDATION #1
                rec1_name = champs_json[rec1]['fields']['name'];
                offset = champs_json[rec1]['fields']['stats_attackspeedoffset'];
                rec1_attack_speed = .625 / (parseFloat(offset) + 1);
                rec1_splash = rec1_name.replace(/\s+/g, '');
                if (rec1 === "7"){
                    rec1_splash = "Leblanc";
                }
                if (rec1 === "31"){
                    rec1_splash = "Chogath";
                }
                if (rec1 === "36"){
                    rec1_splash = "DrMundo";
                }
                if (rec1 === "62"){
                    rec1_splash = "MonkeyKing";
                }
                if (rec1 === "96"){
                    rec1_splash = "KogMaw";
                }
                if (rec1 === "121"){
                    rec1_splash = "Khazix";
                }
                if (rec1 === "161"){
                    rec1_splash = "Velkoz";
                }
                if (rec1 === "421"){
                    rec1_splash = "RekSai";
                }

                rec1_background = "url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + rec1_splash + "_0.jpg)"
                tag2 = champs_json[rec1]['fields']['tags_2']

                $("#Rec1_tag1").attr('src', "/static/homepage/media/" + champs_json[rec1]['fields']['tags_1'] + "_white.png");
                if (tag2 === "None"){
                    $("#Rec1_tag2").hide();
                } else {
                    $("#Rec1_tag2").attr('src', "/static/homepage/media/" + tag2 + "_white.png");
                }

                $(".card1").css("background-image", rec1_background)
                $("#Rec1_img_title").attr('src', champs_json[rec1]['fields']['img_url']);
                $("#Rec1_img").attr('src', champs_json[rec1]['fields']['img_url']);
                $("#Rec1_name").text(rec1_name);
                $("#Rec1_title").text(champs_json[rec1]['fields']['title']);
                $("#Rec1_hp").text(parseFloat(champs_json[rec1]['fields']['stats_hp']).toFixed(3));
                $("#Rec1_hp_perlevel").text(champs_json[rec1]['fields']['stats_hpperlevel']);
                $("#Rec1_attack_damage").text(champs_json[rec1]['fields']['stats_attackdamage']);
                $("#Rec1_attack_damage_perlevel").text(champs_json[rec1]['fields']['stats_attackdamageperlevel']);
                $("#Rec1_attack_speed").text(rec1_attack_speed);
                $("#Rec1_attack_speed_perlevel").text(champs_json[rec1]['fields']['stats_attackspeedperlevel']);
                $("#Rec1_move_speed").text(champs_json[rec1]['fields']['stats_movespeed']);
                $("#Rec1_hp_regen").text(champs_json[rec1]['fields']['stats_hpregen']);
                $("#Rec1_hp_regen_perlevel").text(champs_json[rec1]['fields']['stats_hpregenperlevel']);
                $("#Rec1_armor").text(champs_json[rec1]['fields']['stats_armor']);
                $("#Rec1_armor_perlevel").text(champs_json[rec1]['fields']['stats_armorperlevel']);
                $("#Rec1_spellblock").text(champs_json[rec1]['fields']['stats_spellblock']);
                $("#Rec1_spellblock_perlevel").text(champs_json[rec1]['fields']['stats_spellblockperlevel']);

                // RECOMMENDATION #2
                rec2_name = champs_json[rec2]['fields']['name'];
                offset = champs_json[rec2]['fields']['stats_attackspeedoffset'];
                rec2_attack_speed = .625 / (parseFloat(offset) + 1);
                rec2_splash = rec2_name.replace(/\s+/g, '');
                if (rec2 === "7"){
                    rec2_splash = "Leblanc";
                }
                if (rec2 === "31"){
                    rec2_splash = "Chogath";
                }
                if (rec2 === "36"){
                    rec2_splash = "DrMundo";
                }
                if (rec2 === "62"){
                    rec2_splash = "MonkeyKing";
                }
                if (rec2 === "96"){
                    rec2_splash = "KogMaw";
                }
                if (rec2 === "121"){
                    rec2_splash = "Khazix";
                }
                if (rec2 === "161"){
                    rec2_splash = "Velkoz";
                }
                if (rec2 === "421"){
                    rec2_splash = "RekSai";
                }

                rec2_background = "url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + rec2_splash + "_0.jpg)"
                tag2 = champs_json[rec2]['fields']['tags_2']

                $("#Rec2_tag1").attr('src', "/static/homepage/media/" + champs_json[rec2]['fields']['tags_1'] + "_white.png");
                if (tag2 === "None"){
                    $("#Rec2_tag2").hide();
                } else {
                    $("#Rec2_tag2").attr('src', "/static/homepage/media/" + tag2 + "_white.png");
                }

                $(".card2").css("background-image", rec2_background)
                $("#Rec2_img_title").attr('src', champs_json[rec2]['fields']['img_url']);
                $("#Rec2_img").attr('src', champs_json[rec2]['fields']['img_url']);
                $("#Rec2_name").text(rec2_name);
                $("#Rec2_title").text(champs_json[rec2]['fields']['title']);
                $("#Rec2_hp").text(parseFloat(champs_json[rec2]['fields']['stats_hp']).toFixed(3));
                $("#Rec2_hp_perlevel").text(champs_json[rec2]['fields']['stats_hpperlevel']);
                $("#Rec2_attack_damage").text(champs_json[rec2]['fields']['stats_attackdamage']);
                $("#Rec2_attack_damage_perlevel").text(champs_json[rec2]['fields']['stats_attackdamageperlevel']);
                $("#Rec2_attack_speed").text(rec2_attack_speed);
                $("#Rec2_attack_speed_perlevel").text(champs_json[rec2]['fields']['stats_attackspeedperlevel']);
                $("#Rec2_move_speed").text(champs_json[rec2]['fields']['stats_movespeed']);
                $("#Rec2_hp_regen").text(champs_json[rec2]['fields']['stats_hpregen']);
                $("#Rec2_hp_regen_perlevel").text(champs_json[rec2]['fields']['stats_hpregenperlevel']);
                $("#Rec2_armor").text(champs_json[rec2]['fields']['stats_armor']);
                $("#Rec2_armor_perlevel").text(champs_json[rec2]['fields']['stats_armorperlevel']);
                $("#Rec2_spellblock").text(champs_json[rec2]['fields']['stats_spellblock']);
                $("#Rec2_spellblock_perlevel").text(champs_json[rec2]['fields']['stats_spellblockperlevel']);

                // RECOMMENDATION #3
                rec3_name = champs_json[rec3]['fields']['name'];
                offset = champs_json[rec3]['fields']['stats_attackspeedoffset'];
                rec3_attack_speed = .625 / (parseFloat(offset) + 1);
                rec3_splash = rec3_name.replace(/\s+/g, '');
                if (rec3 === "7"){
                    rec3_splash = "Leblanc";
                }
                if (rec3 === "31"){
                    rec3_splash = "Chogath";
                }
                if (rec3 === "36"){
                    rec3_splash = "DrMundo";
                }
                if (rec3 === "62"){
                    rec3_splash = "MonkeyKing";
                }
                if (rec3 === "96"){
                    rec3_splash = "KogMaw";
                }
                if (rec3 === "121"){
                    rec3_splash = "Khazix";
                }
                if (rec3 === "161"){
                    rec3_splash = "Velkoz";
                }
                if (rec3 === "421"){
                    rec3_splash = "RekSai";
                }

                rec3_background = "url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + rec3_splash + "_0.jpg)"
                tag2 = champs_json[rec3]['fields']['tags_2']

                $("#Rec3_tag1").attr('src', "/static/homepage/media/" + champs_json[rec3]['fields']['tags_1'] + "_white.png");
                if (tag2 === "None"){
                    $("#Rec3_tag2").hide();
                } else {
                    $("#Rec3_tag2").attr('src', "/static/homepage/media/" + tag2 + "_white.png");
                }

                $(".card3").css("background-image", rec3_background)
                $("#Rec3_img_title").attr('src', champs_json[rec3]['fields']['img_url']);
                $("#Rec3_img").attr('src', champs_json[rec3]['fields']['img_url']);
                $("#Rec3_name").text(rec3_name);
                $("#Rec3_title").text(champs_json[rec3]['fields']['title']);
                $("#Rec3_hp").text(parseFloat(champs_json[rec3]['fields']['stats_hp']).toFixed(3));
                $("#Rec3_hp_perlevel").text(champs_json[rec3]['fields']['stats_hpperlevel']);
                $("#Rec3_attack_damage").text(champs_json[rec3]['fields']['stats_attackdamage']);
                $("#Rec3_attack_damage_perlevel").text(champs_json[rec3]['fields']['stats_attackdamageperlevel']);
                $("#Rec3_attack_speed").text(rec3_attack_speed);
                $("#Rec3_attack_speed_perlevel").text(champs_json[rec3]['fields']['stats_attackspeedperlevel']);
                $("#Rec3_move_speed").text(champs_json[rec3]['fields']['stats_movespeed']);
                $("#Rec3_hp_regen").text(champs_json[rec3]['fields']['stats_hpregen']);
                $("#Rec3_hp_regen_perlevel").text(champs_json[rec3]['fields']['stats_hpregenperlevel']);
                $("#Rec3_armor").text(champs_json[rec3]['fields']['stats_armor']);
                $("#Rec3_armor_perlevel").text(champs_json[rec3]['fields']['stats_armorperlevel']);
                $("#Rec3_spellblock").text(champs_json[rec3]['fields']['stats_spellblock']);
                $("#Rec3_spellblock_perlevel").text(champs_json[rec3]['fields']['stats_spellblockperlevel']);

                // RECOMMENDATION #4
                rec4_name = champs_json[rec4]['fields']['name'];
                offset = champs_json[rec4]['fields']['stats_attackspeedoffset'];
                rec4_attack_speed = .625 / (parseFloat(offset) + 1);
                rec4_splash = rec4_name.replace(/\s+/g, '');
                if (rec4 === "7"){
                    rec4_splash = "Leblanc";
                }
                if (rec4 === "31"){
                    rec4_splash = "Chogath";
                }
                if (rec4 === "36"){
                    rec4_splash = "DrMundo";
                }
                if (rec4 === "62"){
                    rec4_splash = "MonkeyKing";
                }
                if (rec4 === "96"){
                    rec4_splash = "KogMaw";
                }
                if (rec4 === "121"){
                    rec4_splash = "Khazix";
                }
                if (rec4 === "161"){
                    rec4_splash = "Velkoz";
                }
                if (rec4 === "421"){
                    rec4_splash = "RekSai";
                }

                rec4_background = "url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + rec4_splash + "_0.jpg)"
                tag2 = champs_json[rec4]['fields']['tags_2']

                $("#Rec4_tag1").attr('src', "/static/homepage/media/" + champs_json[rec4]['fields']['tags_1'] + "_white.png");
                if (tag2 === "None"){
                    $("#Rec4_tag2").hide();
                } else {
                    $("#Rec4_tag2").attr('src', "/static/homepage/media/" + tag2 + "_white.png");
                }

                $(".card4").css("background-image", rec4_background)
                $("#Rec4_img_title").attr('src', champs_json[rec4]['fields']['img_url']);
                $("#Rec4_img").attr('src', champs_json[rec4]['fields']['img_url']);
                $("#Rec4_name").text(rec4_name);
                $("#Rec4_title").text(champs_json[rec4]['fields']['title']);
                $("#Rec4_hp").text(parseFloat(champs_json[rec4]['fields']['stats_hp']).toFixed(3));
                $("#Rec4_hp_perlevel").text(champs_json[rec4]['fields']['stats_hpperlevel']);
                $("#Rec4_attack_damage").text(champs_json[rec4]['fields']['stats_attackdamage']);
                $("#Rec4_attack_damage_perlevel").text(champs_json[rec4]['fields']['stats_attackdamageperlevel']);
                $("#Rec4_attack_speed").text(rec4_attack_speed);
                $("#Rec4_attack_speed_perlevel").text(champs_json[rec4]['fields']['stats_attackspeedperlevel']);
                $("#Rec4_move_speed").text(champs_json[rec4]['fields']['stats_movespeed']);
                $("#Rec4_hp_regen").text(champs_json[rec4]['fields']['stats_hpregen']);
                $("#Rec4_hp_regen_perlevel").text(champs_json[rec4]['fields']['stats_hpregenperlevel']);
                $("#Rec4_armor").text(champs_json[rec4]['fields']['stats_armor']);
                $("#Rec4_armor_perlevel").text(champs_json[rec4]['fields']['stats_armorperlevel']);
                $("#Rec4_spellblock").text(champs_json[rec4]['fields']['stats_spellblock']);
                $("#Rec4_spellblock_perlevel").text(champs_json[rec4]['fields']['stats_spellblockperlevel']);

                // RECOMMENDATION #5
                rec5_name = champs_json[rec5]['fields']['name'];
                offset = champs_json[rec5]['fields']['stats_attackspeedoffset'];
                rec5_attack_speed = .625 / (parseFloat(offset) + 1);
                rec5_splash = rec5_name.replace(/\s+/g, '');
                if (rec5 === "7"){
                    rec5_splash = "Leblanc";
                }
                if (rec5 === "31"){
                    rec5_splash = "Chogath";
                }
                if (rec5 === "36"){
                    rec5_splash = "DrMundo";
                }
                if (rec5 === "62"){
                    rec5_splash = "MonkeyKing";
                }
                if (rec5 === "96"){
                    rec5_splash = "KogMaw";
                }
                if (rec5 === "121"){
                    rec5_splash = "Khazix";
                }
                if (rec5 === "161"){
                    rec5_splash = "Velkoz";
                }
                if (rec5 === "421"){
                    rec5_splash = "RekSai";
                }

                rec5_background = "url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + rec5_splash + "_0.jpg)"
                tag2 = champs_json[rec5]['fields']['tags_2']

                $("#Rec5_tag1").attr('src', "/static/homepage/media/" + champs_json[rec5]['fields']['tags_1'] + "_white.png");
                if (tag2 === "None"){
                    $("#Rec5_tag2").hide();
                } else {
                    $("#Rec5_tag2").attr('src', "/static/homepage/media/" + tag2 + "_white.png");
                }

                $(".card5").css("background-image", rec5_background)
                $("#Rec5_img_title").attr('src', champs_json[rec5]['fields']['img_url']);
                $("#Rec5_img").attr('src', champs_json[rec5]['fields']['img_url']);
                $("#Rec5_name").text(rec5_name);
                $("#Rec5_title").text(champs_json[rec5]['fields']['title']);
                $("#Rec5_hp").text(parseFloat(champs_json[rec5]['fields']['stats_hp']).toFixed(3));
                $("#Rec5_hp_perlevel").text(champs_json[rec5]['fields']['stats_hpperlevel']);
                $("#Rec5_attack_damage").text(champs_json[rec5]['fields']['stats_attackdamage']);
                $("#Rec5_attack_damage_perlevel").text(champs_json[rec5]['fields']['stats_attackdamageperlevel']);
                $("#Rec5_attack_speed").text(rec5_attack_speed);
                $("#Rec5_attack_speed_perlevel").text(champs_json[rec5]['fields']['stats_attackspeedperlevel']);
                $("#Rec5_move_speed").text(champs_json[rec5]['fields']['stats_movespeed']);
                $("#Rec5_hp_regen").text(champs_json[rec5]['fields']['stats_hpregen']);
                $("#Rec5_hp_regen_perlevel").text(champs_json[rec5]['fields']['stats_hpregenperlevel']);
                $("#Rec5_armor").text(champs_json[rec5]['fields']['stats_armor']);
                $("#Rec5_armor_perlevel").text(champs_json[rec5]['fields']['stats_armorperlevel']);
                $("#Rec5_spellblock").text(champs_json[rec5]['fields']['stats_spellblock']);
                $("#Rec5_spellblock_perlevel").text(champs_json[rec5]['fields']['stats_spellblockperlevel']);

                $(".recommendations").show();
                EasyLoading.hide();
                $('html, body').animate({
                    scrollTop: $(".recommendations").offset().top
                }, 1000);

            },
            error: function(error_message) {
                alert("An error occurred, please try again later.");
            }
        });
        return false;
    });

    /***************** TEAM MEMBER 1 *****************/
    $(document).on("click", "#SelectedChampion1", function(e) {
        e.preventDefault();
        $(".champ_menu1").show();
        $(".champ_menu2").hide();
        $(".champ_menu3").hide();
        $(".champ_menu4").hide();
        $(".champ_menu5").hide();
        $(".champ_menu6").hide();
        $(".champ_menu7").hide();
        $(".champ_menu8").hide();
        $(".champ_menu9").hide();
    });

    $(document).on("click", ".champ_menu1 li > a", function(e) {
        var image = $(this).children('img').attr('src');
        var name = $(this).children('p').text();
        $(".selected_champ_img1").attr('src', image);
        $('#SelectedChampion1').text(name);
        $("#id_Champion1 option[value='" + this.title + "']").prop('selected', true);
        $(".champ_menu1").hide();
        return false;
    });

    /***************** TEAM MEMBER 2 *****************/
    $(document).on("click", "#SelectedChampion2", function(e) {
        e.preventDefault();
        $(".champ_menu2").show();
        $(".champ_menu1").hide();
        $(".champ_menu3").hide();
        $(".champ_menu4").hide();
        $(".champ_menu5").hide();
        $(".champ_menu6").hide();
        $(".champ_menu7").hide();
        $(".champ_menu8").hide();
        $(".champ_menu9").hide();
    });

    $(document).on("click", ".champ_menu2 li > a", function(e) {
        var image = $(this).children('img').attr('src');
        var name = $(this).children('p').text();
        $(".selected_champ_img2").attr('src', image);
        $('#SelectedChampion2').text(name);
        $("#id_Champion2 option[value='" + this.title + "']").prop('selected', true);
        $(".champ_menu2").hide();
        return false;
    });

    /***************** TEAM MEMBER 3 *****************/
    $(document).on("click", "#SelectedChampion3", function(e) {
        e.preventDefault();
        $(".champ_menu3").show();
        $(".champ_menu2").hide();
        $(".champ_menu1").hide();
        $(".champ_menu4").hide();
        $(".champ_menu5").hide();
        $(".champ_menu6").hide();
        $(".champ_menu7").hide();
        $(".champ_menu8").hide();
        $(".champ_menu9").hide();
    });

    $(document).on("click", ".champ_menu3 li > a", function(e) {
        var image = $(this).children('img').attr('src');
        var name = $(this).children('p').text();
        $(".selected_champ_img3").attr('src', image);
        $('#SelectedChampion3').text(name);
        $("#id_Champion3 option[value='" + this.title + "']").prop('selected', true);
        $(".champ_menu3").hide();
        return false;
    });

    /***************** TEAM MEMBER 4 *****************/
    $(document).on("click", "#SelectedChampion4", function(e) {
        e.preventDefault();
        $(".champ_menu4").show();
        $(".champ_menu2").hide();
        $(".champ_menu3").hide();
        $(".champ_menu1").hide();
        $(".champ_menu5").hide();
        $(".champ_menu6").hide();
        $(".champ_menu7").hide();
        $(".champ_menu8").hide();
        $(".champ_menu9").hide();
    });

    $(document).on("click", ".champ_menu4 li > a", function(e) {
        var image = $(this).children('img').attr('src');
        var name = $(this).children('p').text();
        $(".selected_champ_img4").attr('src', image);
        $('#SelectedChampion4').text(name);
        $("#id_Champion4 option[value='" + this.title + "']").prop('selected', true);
        $(".champ_menu4").hide();
        return false;
    });

    /***************** TEAM MEMBER 5 *****************/
    $(document).on("click", "#SelectedChampion5", function(e) {
        e.preventDefault();
        $(".champ_menu5").show();
        $(".champ_menu2").hide();
        $(".champ_menu3").hide();
        $(".champ_menu4").hide();
        $(".champ_menu1").hide();
        $(".champ_menu6").hide();
        $(".champ_menu7").hide();
        $(".champ_menu8").hide();
        $(".champ_menu9").hide();
    });

    $(document).on("click", ".champ_menu5 li > a", function(e) {
        var image = $(this).children('img').attr('src');
        var name = $(this).children('p').text();
        $(".selected_champ_img5").attr('src', image);
        $('#SelectedChampion5').text(name);
        $("#id_Champion5 option[value='" + this.title + "']").prop('selected', true);
        $(".champ_menu5").hide();
        return false;
    });

    /***************** TEAM MEMBER 6 *****************/
    $(document).on("click", "#SelectedChampion6", function(e) {
        e.preventDefault();
        $(".champ_menu6").show();
        $(".champ_menu2").hide();
        $(".champ_menu3").hide();
        $(".champ_menu4").hide();
        $(".champ_menu5").hide();
        $(".champ_menu1").hide();
        $(".champ_menu7").hide();
        $(".champ_menu8").hide();
        $(".champ_menu9").hide();
    });

    $(document).on("click", ".champ_menu6 li > a", function(e) {
        var image = $(this).children('img').attr('src');
        var name = $(this).children('p').text();
        $(".selected_champ_img6").attr('src', image);
        $('#SelectedChampion6').text(name);
        $("#id_Champion6 option[value='" + this.title + "']").prop('selected', true);
        $(".champ_menu6").hide();
        return false;
    });

    /***************** TEAM MEMBER 7 *****************/
    $(document).on("click", "#SelectedChampion7", function(e) {
        e.preventDefault();
        $(".champ_menu7").show();
        $(".champ_menu2").hide();
        $(".champ_menu3").hide();
        $(".champ_menu4").hide();
        $(".champ_menu5").hide();
        $(".champ_menu6").hide();
        $(".champ_menu1").hide();
        $(".champ_menu8").hide();
        $(".champ_menu9").hide();
    });

    $(document).on("click", ".champ_menu7 li > a", function(e) {
        var image = $(this).children('img').attr('src');
        var name = $(this).children('p').text();
        $(".selected_champ_img7").attr('src', image);
        $('#SelectedChampion7').text(name);
        $("#id_Champion7 option[value='" + this.title + "']").prop('selected', true);
        $(".champ_menu7").hide();
        return false;
    });

    /***************** TEAM MEMBER 8 *****************/
    $(document).on("click", "#SelectedChampion8", function(e) {
        e.preventDefault();
        $(".champ_menu8").show();
        $(".champ_menu2").hide();
        $(".champ_menu3").hide();
        $(".champ_menu4").hide();
        $(".champ_menu5").hide();
        $(".champ_menu6").hide();
        $(".champ_menu7").hide();
        $(".champ_menu1").hide();
        $(".champ_menu9").hide();
    });

    $(document).on("click", ".champ_menu8 li > a", function(e) {
        var image = $(this).children('img').attr('src');
        var name = $(this).children('p').text();
        $(".selected_champ_img8").attr('src', image);
        $('#SelectedChampion8').text(name);
        $("#id_Champion8 option[value='" + this.title + "']").prop('selected', true);
        $(".champ_menu8").hide();
        return false;
    });

    /***************** TEAM MEMBER 9 *****************/
    $(document).on("click", "#SelectedChampion9", function(e) {
        e.preventDefault();
        $(".champ_menu9").show();
        $(".champ_menu2").hide();
        $(".champ_menu3").hide();
        $(".champ_menu4").hide();
        $(".champ_menu5").hide();
        $(".champ_menu6").hide();
        $(".champ_menu7").hide();
        $(".champ_menu8").hide();
        $(".champ_menu1").hide();
    });

    $(document).on("click", ".champ_menu9 li > a", function(e) {
        var image = $(this).children('img').attr('src');
        var name = $(this).children('p').text();
        $(".selected_champ_img9").attr('src', image);
        $('#SelectedChampion9').text(name);
        $("#id_Champion9 option[value='" + this.title + "']").prop('selected', true);
        $(".champ_menu9").hide();
        return false;
    });

})(DMP_CONTEXT.get());
