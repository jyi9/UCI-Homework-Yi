Sub MarketData():

    For each ws in Worksheets:

        Dim TickerName As String

        Dim TickerVolume As Double 
        TickerVolume = 0 

    ' Store each ticker name in  table 
        Dim TickerLocation as Integer 
        TickerLocation = 2 

        Dim OpenPrice As Double 
        OpenPrice = Cells(2,3).Value 

        Dim ClosePrice As Double
        Dim YearlyChange As Double 
        Dim PercentChange As Double

    ' Label Columns 
        ws.Cells(1,9).Value = "Ticker"
        ws.Cells(1,10).Value = "Yearly Change"
        ws.Cells(1, 11).Value = "Percent Change"
        ws.Cells(1, 12).Value = "Total Volume"


        lastrow = ws.Cells(Rows.Count, 1).End(xlUp).Row 

    ' Loop through row with ticker names 
        For i = 2 to lastrow 

        ' Search for when ticker is different that current ticker 
            If ws.Cells(i + 1, 1).Value <> ws.Cells(i, 1).Value Then 

                TickerName = ws.Cells(i, 1).Value 
                TickerVolume = TickerVolume + ws.Cells(i, 7).Value

                ws.Range("I" & TickerLocation).Value = TickerName
                ws.Range("L" & TickerLocation).Value = TickerVolume

                ClosePrice = ws.Cells(i, 6).Value 
                YearlyChange = (ClosePrice - OpenPrice)

                ws.Range("J" & TickerLocation).Value = YearlyChange
                If (OpenPrice) = 0 Then 
                    PercentChange = 0
                Else
                    PercentChange = YearlyChange / OpenPrice
                End If

                ws.Range("K" & TickerLocation).Value = PercentChange
                ws.Range("K" & TickerLocation).NumberFormat = "0.00%"

                TickerLocation = TickerLocation + 1

                TickerVolume = 0 

                OpenPrice = ws.Cells(i + 1, 3)

            Else 
                TickerVolume = TickerVolume + ws.Cells(i, 7).Value

            End If

        Next i 

        LastRowTable = ws.Cells(Rows.Count, 9).End(xlUp).Row 

        For i = 2 To LastRowTable 
            If ws.Cells(i, 10).Value > 0 Then 
             ws.Cells(i, 10).Interior.ColorIndex = 10 
            Else 
                ws.Cells(i, 10).Interior.ColorIndex = 3 
            End If 
            
        Next i 

    Next ws
End Sub 






