var viz, workbook, activeSheet;

function initViz() {
    var containerDiv = document.getElementById("tableauViz"),
    url = "https://public.tableau.com/views/LeagueOfLegends/Dashboard?:embed=y&:display_count=yes&publish=yes";
    var options = {
        hideTabs: true,
        hideToolbar: true,
        onFirstInteractive: function () {
            listenToMarksSelection();
            workbook = viz.getWorkbook();
            activeSheet = workbook.getActiveSheet();
        }
    };
    viz = new tableau.Viz(containerDiv, url, options);
}


function filterSingleValue(tag) {
    activeSheet = workbook.getActiveSheet().getWorksheets().get("Win Percentage By Hero");
    activeSheet.applyFilterAsync(
    "Tags 1",
    tag,
    tableau.FilterUpdateType.REPLACE);
}

function clearFilters() {
  activeSheet = workbook.getActiveSheet().getWorksheets().get("Win Percentage By Hero");
  activeSheet.clearFilterAsync("Tags 1");
}

function addValuesToSelection() {
    workbook.getActiveSheet().getWorksheets().get("Win Percentage By Partype").selectMarksAsync(
    "Partype",
    "Blood Well",
    tableau.FilterUpdateType.ADD);
}

function listenToMarksSelection() {
    viz.addEventListener(tableau.TableauEventName.MARKS_SELECTION, onMarksSelection);
}

function onMarksSelection(marksEvent) {
    return marksEvent.getMarksAsync().then(reportSelectedMarks);
}

function reportSelectedMarks(marks) {
    var html = "";

    for (var markIndex = 0; markIndex < marks.length; markIndex++) {
        var pairs = marks[markIndex].getPairs();
        html += "<b>Details:</b><ul>";

        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
            var pair = pairs[pairIndex];
            html += "<li><b>Field Name:</b> " + pair.fieldName;
            html += "<br/><b>Value:</b> " + pair.formattedValue + "</li>";
        }

        html += "</ul>";
    }

    var infoDiv = document.getElementById('markDetails');
    infoDiv.innerHTML = html;
}

function exportPDF() {
    viz.showExportPDFDialog();
}

function revertAll() {
  workbook.revertAllAsync();
}
